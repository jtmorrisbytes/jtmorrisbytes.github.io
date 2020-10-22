console.log("posts router starting up");
const express = require("express");

const mountPath = "/projects";
const projects = express.Router();

module.exports = { path: mountPath, router: projects };
