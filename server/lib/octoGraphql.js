module.exports = require("@octokit/graphql").graphql.defaults({
  headers: { authorization: `token ${process.env.GITHUB_AUTH_TOKEN}` },
});
