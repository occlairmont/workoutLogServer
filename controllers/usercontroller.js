const router = require("express").Router();
const User = require("../db").import("../models/user");

router.post("/user/", (req, res) => {
  User.create({
    username: req.body.username,
    passwordHash: req.body.password,
  }).then(res.send("this is the create user endpoint"));
});

// router.post("/login/", (req, res) => {
//   User.findAll({
//     where: {
//       username: req.body.username,
//     },
//   }).then(res.sen);
// });

module.exports = router;
