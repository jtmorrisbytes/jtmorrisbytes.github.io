console.log("posts router starting up");
const express = require("express");

const mountPath = "/projects";
const projects = express.Router();

projects.get("/", (req, res) => {
  // get all projects listed in the database
});

module.exports = { path: mountPath, router: projects };
