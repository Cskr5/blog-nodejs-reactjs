const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const gravtar = require("gravatar");
const bcrypt = require("bcryptjs");

//@route  GET api/users/test
//@desc   Tests post route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Users works" }));

//@route  GET api/users/register
//@desc   Tests post route
//@access Public

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravtar.url(req.body.avatar, {
        s: "200",
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route  GET api/users/login
//@desc   TLogin User / returning JWT token
//@access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    //Check password match
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res.json({ msg: "Success" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
