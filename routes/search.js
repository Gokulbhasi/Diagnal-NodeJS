const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Film = require("../model/filmsModel");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", async (req, res) => {
  //Joi Validation
  const schema = {
    q: Joi.string()
      .min(1)
      .required()
  };
  const result = Joi.validate(req.query, schema);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  //db search
  const searchData = await Film.find({
    name: new RegExp(".*" + req.query.q + ".*", "i")
  }).select({
    name: 1
  });
  //json structure
  const searchResult = {
    status: true,
    hits: searchData.length > 0 ? searchData.length : false,
    data: searchData
  };
  //return json result with header
  const token = jwt.sign(config.get("accessCode"), config.get("webToken"));
  res.header("x-auth-token", token).send(searchResult);
});

module.exports = router;
