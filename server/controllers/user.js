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
  githubClient.users.getAuthenticated().then((response) => {
    return req.app
      .get("db")
      .user.get(response.data.login)
      .then((response) => {
        if (response.length > 0) {
          res.json(response[0]);
        } else {
          res.status(500).json({
            message: "Server is not in a valid state to perform this request",
            reason: "User has not been setup yet",
            code: "E_RUN_USER_SETUP",
          });
        }
      });
  });
});

module.exports = {
  path: "/user",
  router: user,
};
