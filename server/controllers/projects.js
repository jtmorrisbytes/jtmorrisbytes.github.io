console.log("posts router starting up");
const express = require("express");

const mountPath = "/projects";
const projects = express.Router();
// check that the database is available
projects.use((req, res, next) => {
  if (req.app.get("db") == null) {
    res.status(500).json({ message: "Database Unavailable" });
  } else {
    next();
  }
});

projects.get("/", (req, res) => {
  // get all projects listed in the database
  const db = req.app.get("db");
  db.projects
    .getAll()
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
    });
});

module.exports = { path: mountPath, router: projects };
