const router = require("express").Router();
const User = require("../db").import("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/user/", (req, res) => {
  User.create({
    username: req.body.username,
    passwordHash: bcrypt.hashSync(req.body.password, 13),
  })
    .then(function (user) {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      res.json({
        user: user,
        message: "User successfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/login/", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(
      (loginSuccess = (user) => {
        if (user) {
          bcrypt.compare(
            req.body.password,
            user.passwordHash,
            (err, matches) => {
              if (matches) {
                let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                  expiresIn: 60 * 60 * 24,
                });
                res.status(200).json({
                  user: user,
                  message: "Login Successful!",
                  sessionToken: token,
                });
              } else {
                res.status(502).json({ error: "Login Failed" });
              }
            }
          );
        } else {
          res.status(500).json({ error: "User does not exist." });
        }
      })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
