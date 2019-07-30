const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Film = require("../model/filmsModel");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", async (req, res, next) => {
  //Joi Validation
  const schema = {
    pgno: Joi.number()
      .integer()
      .min(1)
      .default(1),
    size: Joi.number()
      .integer()
      .min(1)
      .default(10)
  };
  const result = Joi.validate(req.query, schema);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  //query params
  const pgno = Number(req.query.pgno);
  const size = Number(req.query.size);
  //db search
  const count = await Film.find().countDocuments(); //get count of objects
  const filmData = await Film.find()
    .skip((pgno - 1) * size)
    .limit(size)
    .select({ _id: 0, name: 1, image: 1 }); //get list without id
  //json structure
  const pageCount = Math.ceil(count / size);
  const listResult = {
    status: pgno <= pageCount ? true : false,
    count: count,
    pageNo: pgno,
    size: size,
    pagination: pgno * size < count ? true : false,
    pages: pageCount,
    data: filmData
  };
  //return json result with header
  //console.log(listResult);
  //const token = Film.generateAuthToken();
  const token = jwt.sign(config.get("accessCode"), config.get("webToken"));
  res.header("x-auth-token", token).send(listResult);
});

module.exports = router;
