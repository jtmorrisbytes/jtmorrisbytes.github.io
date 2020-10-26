const express = require("express");
const { func } = require("prop-types");
const admin = express.Router();

const Axios = require("axios");

const { ADMIN_CLIENT_ID, GITHUB_AUTH_TOKEN, HEROKU_AUTH_TOKEN } = process.env;

const { Octokit } = require("@octokit/rest");

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

admin.get("/user", function getInitialData(req, res) {
  if (req.user == null) {
    res.sendStatus(401);
  } else {
    res.json(req.user);
  }
});

admin.get("/login", (req, res) => {
  res.redirect("https://github.com/login/oauth/authorize");
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

module.exports = { path: "/admin", router: admin };
