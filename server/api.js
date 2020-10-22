// this is the api server module
const express = require("express");
const path = require("path");

const api = express.Router();
const mountPath = "/api";

// since webpack is not being used
// we can just read the "controllers"
// directory and dynamically require() subrouters

// get a list of controllers installed on the system

console.log("getting controllers");
require("fs")
  .readdirSync(path.join(__dirname, "controllers"))
  .filter((f) => path.extname.length === 0 || path.extname(f) === ".js")
  .forEach((f) => {
    // get the controller at the specified path
    console.log("getting controller: ", f);
    let controller = require(`./controllers/${f}`);
    console.log("controller", controller);
    // mount the above controller at the path specified
    // using the router given
    api.use(controller.path, controller.router);
  });

module.exports = { path: mountPath, router: api };
