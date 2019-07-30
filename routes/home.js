const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ statue: true, page: "home", data: {} });
});

module.exports = router;
