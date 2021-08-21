var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("../views/welcome");
});

module.exports = router;
