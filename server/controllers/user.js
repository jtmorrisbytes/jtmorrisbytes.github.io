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
      .user.getByGithubUsername(response.data.login)
      .then((user) => {
        if (Array.isArray(user)) {
          user = user[0];
        }
        throw new Error("IMPLEMENTATION NOT FINISHED");
      });
  });
});

module.exports = {
  path: "/user",
  router: user,
};
