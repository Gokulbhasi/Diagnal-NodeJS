const express = require("express");
const logger = require("../middleware/auth");
const error = require("../middleware/error");
const helmet = require("helmet");
const search = require("../routes/search");
const list = require("../routes/list");
const home = require("../routes/home");

module.exports = function(app) {
  //middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(logger);
  app.use(helmet());
  //api
  app.use("/api/search", search);
  app.use("/api/list", list);
  app.use("/", home);
  app.use(error);
};
