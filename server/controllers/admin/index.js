const express = require("express");

const session = require("express-session");

const admin = express.Router();

const crypto = require("crypto");

const Axios = require("axios");

const {
  ADMIN_CLIENT_ID,
  GITHUB_CLIENT_ID,
  GITHUB_AUTH_TOKEN,
  GITHUB_CLIENT_SECRET,
  HEROKU_AUTH_TOKEN,
} = process.env;

const { Octokit } = require("@octokit/rest");
const ensureClientIdInQuery = require("../../middleware/ensureClientIdInQuery");
const ensureAccessTokenInQuery = require("../../middleware/ensureAccessTokenInBody");
const getAllDbUsers = require("./getAllDbUsers");

const routePath = "/admin";

const githubClient = new Octokit({
  auth: GITHUB_AUTH_TOKEN,
  userAgent: "jtmorrisbytes-admin-panel",
});

if (ADMIN_CLIENT_ID == null) {
  throw new TypeError(
    "process.env.ADMIN_CLIENT_ID must be provided to use this module"
  );
}
if (GITHUB_AUTH_TOKEN == null) {
  throw new TypeError(
    "process.env.GITHUB_AUTH_TOKEN must be provided to use this module"
  );
}

admin.use(
  session({
    secret: crypto.randomBytes(64).toString("hex"),
    path: routePath,
    saveUninitialized: false,
    resave: false,
  })
);
admin.use((req, res, next) => {
  console.log("checking req.session", req.session);
  next();
});

// check ADMIN_CLIENT_ID against request params
// if no match, client is unauthorized
// ACID = ADMIN_CLIENT_ID
admin.use((req, res, next) => {
  if (req.header("X-ACID") === ADMIN_CLIENT_ID) {
    next();
  } else {
    res.status(401).json("ACID MISMATCH");
  }
});

// the admin panel needs access
// to my github user account
// which requires an auth token

admin.get("/user/github", function getInitialData(req, res) {
  if (req.session.user == null) {
    res.sendStatus(401);
  } else {
    res.json(req.session.user);
  }
});
admin.get("/users", getAllDbUsers);
admin.post(
  "/login/verify/access_code",

  function ensureCodeInQuery(req, res, next) {
    if (req?.query?.code?.length > 0) {
      next();
    } else {
      res.status(400).json("Missing 'code' in query");
    }
  },
  ensureClientIdInQuery,
  (req, res) => {
    const { client_id, code, state } = req.query;

    if (state !== req.app.get("admin.authState")) {
      res.status(403).json({
        error: "E_AUTH_MISMATCH",
        error_description: "auth state mismatch",
      });
      return;
    }

    Axios({
      method: "post",
      url:
        `https://github.com/login/oauth/access_token?client_id=${client_id}&code=${code}&client_secret=${GITHUB_CLIENT_SECRET}` +
        (state ? `&state=${state}` : ""),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        const { access_token, token_type, scope } = response.data;
        if (response?.data?.error) {
          return Promise.reject(response);
        }
        // verify the tokens match
        return githubClient.users.getAuthenticated().then((PATResponse) => {
          console.log("got PAT user");
          return githubClient
            .request({
              auth: `token ${access_token}`,
              method: "GET",
              url: "/user",
            })
            .then((ATResponse) => {
              console.log("Got AT user");
              let PATUser = PATResponse.data,
                ATuser = ATResponse.data;
              if (ATuser.login === PATUser.login) {
                console.log("Logins match. continuing");
                req.session.user = {
                  ...ATuser,
                  access_token,
                };

                res.status(200).json({ access_token });
              } else {
                res.status(403).json({
                  error: "E_LOGIN_MISMATCH",
                  description: "You are not permitted to access this resource",
                });
              }
            });
        });
      })
      .catch((e) => {
        let data = e?.response?.data || e?.data;
        if (e.status === 200 && data.error) {
          res.status(400);
        }
        res.json(data || "Error verifying github token");
      });
    // .finally(() => {
    //   res.sendStatus(200);
    // });
    // res.status(200).send("hello world");
  }
);
admin.post(
  "/login/verify/access_token",
  ensureClientIdInQuery,
  ensureAccessTokenInQuery,
  (req, res) => {
    const { client_id, access_token, token_type } = req.query;
    if (token_type == null) {
      res.status(400).json("missing token type in request");
      return;
    }
    // check that the login of the PAT and the AT match. PAT should
    // only be used for verification purposes
    githubClient.users
      .getAuthenticated()
      .then((PATResponse) => {
        return githubClient
          .request({
            auth: `token ${access_token}`,
            method: "GET",
            url: "/user",
          })
          .then((ATResponse) => {
            let PATUser = PATResponse.data,
              ATuser = ATResponse.data;
            if (ATuser.login === PATUser.login) {
              req.session.user = {
                ...ATuser,
                access_token,
              };
              res.sendStatus(200);
            } else {
              res.status(403).json({
                error: "E_LOGIN_MISMATCH",
                description: "You are not permitted to access this resource",
              });
            }
          });
      })
      .catch((e) => {
        console.error(e);
        res.status(500).json(e);
      });
  }
);

admin.get("/login", (req, res) => {
  let state = crypto.randomBytes(8).toString("hex");
  req.app.set("admin.authState", state);
  res.status(200).json({
    url:
      "https://github.com/login/oauth/authorize?client_id=${client_id}&state=${state}",
    state,
    requestScopes: "",
  });
});
// get a list of projects, provided by github

admin.get("/github/projects", function getGithubProjects(req, res) {
  githubClient.request("GET /user/repos").then((r) => {
    res.json(r.data);
  });
});

admin.get("/github/project/:name", function getGithubProjectById(req, res) {
  console.log("get github project by id");
  githubClient.users
    .getAuthenticated()
    .then((authenticatedUserResponse) => {
      const { login } = authenticatedUserResponse.data;
      return githubClient.repos
        .get({ owner: login, repo: req.params.name })
        .then((repo) => {
          console.log(repo.data);
          res.json(repo.data);
        });
    })
    .catch((e) => {
      res
        .status(e.status)
        .json({ name: e.name, status: e.status, request: e.request });
    });
});

module.exports = { path: routePath, router: admin };
