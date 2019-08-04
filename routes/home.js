const express = require("express");
const router = express.Router();
var path = require("path");

router.get("/:img", (req, res) => {
  var options = {
    root: path.join(__dirname, "../public/img/"),
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true
    }
  };
  console.log(options.root);
  var fileName = req.params.img;
  res.sendFile(fileName, options, function(err) {
    if (err) {
      next(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});
module.exports = router;
