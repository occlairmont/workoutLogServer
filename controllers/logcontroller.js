const router = require("express").Router();
const Log = require("../db").import("../models/log");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner: req.user.id,
  };
  Log.create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
