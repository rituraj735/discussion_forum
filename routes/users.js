var express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/register", (req, res) => {
  res.send("Register");
});

router.post("/register", (req, res) => {
  const { name, username, password } = req.body;
  let errors = [];

  if (!name || !username || !password) {
    errors.push({ msg: "Please fill all fields" });
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: "Password should be atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("layout", {
      errors,
      name,
      username,
      password,
    });
  } else {
    User.findOne({ email: username }).then((user) => {
      if (user) {
        errors.push({ msg: "Email already registered" });
        console.log(errors);
        res.render("login", {
          errors,
          name,
          username,
          password,
        });
      } else {
        const newUser = new User({
          name: name,
          email: username,
          password: password,
        });
        //Hash the password
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect("/");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/damnn",
    failureRedirect: "/",
  })(req, res, next);
});
// router.get("/")
module.exports = router;
