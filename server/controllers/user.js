const express = require("express");

const { GITHUB_AUTH_TOKEN } = process.env;

if (GITHUB_AUTH_TOKEN === null) {
  throw new TypeError(
    "process.env.GITHUB_AUTH_TOKEN must be provided to use this module"
  );
}

const { Octokit } = require("@octokit/rest");

const githubClient = new Octokit({ auth: GITHUB_AUTH_TOKEN });

const user = express.Router();
// get the user data based on the github profile
user.get("/", (req, res) => {
  // the user data is based on github.
  // fetch the github user first

  return new Promise((resolve, reject) => {
    let user = req.app.get("githubUser");
    // TODO: Check age of user Data
    console.warn("TODO: implement expiry and refetch of github user data");
    if (user == null /* OR IF DATA IS TOO OLD */) {
      githubClient.users
        .getAuthenticated()
        .then((response) => {
          req.app.set("githubUser", response.data);
          resolve(response.data);
        })
        .catch(reject);
    } else {
      resolve(user);
    }
  })
    .then((ghUser) => {
      return req.app
        .get("db")
        .users.get(ghUser.login)
        .then((response) => {
          if (response.length > 0) {
            let dbUser = response[0];
            const { html_url, url, login, name, email, homepage } = ghUser;
            const { linkedin_profile_url, youtube_channel_url } = dbUser;
            return Promise.resolve({
              username: login,
              name,
              email,
              homepage,
              github: { url, html_url },
              linkedIn: { html_url: linkedin_profile_url },
              youtube: { html_url: youtube_channel_url },
            });
          } else {
            return Promise.reject({
              message: "Server is not in a valid state to perform this request",
              reason: "User has not been setup yet",
              code: "E_RUN_USER_SETUP",
              status: 503,
            });
          }
        });
    })
    .then((resolvedUser) => {
      // user data has been settled and aggregated at this point
      res.status(200);
      if (req.accepts("application/json")) {
        res.status(200).json(resolvedUser);
      } else if (req.accepts("text/plain")) {
        res.send(resolvedUser);
      }
    })
    .catch((error) => {
      res.status(error.status || 500).json(error);
    });
});

module.exports = {
  path: "/user",
  router: user,
};
