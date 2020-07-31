const router = require("express").Router();
const Log = require("../db").import("../models/log");
const validateSession = require("../middleware/validate-session");

router.post("/", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner: req.user.id
  };
  Log.create(logEntry)
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/", validateSession, (req, res) => {
  let userid = req.user.id
  Log.findAll({
    where: {owner: userid}
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.get("/:id", validateSession, (req, res) => {
  let userid = req.user.id
  Log.findAll({
    where: {owner: userid, id:req.params.id}
  })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({error: err}))
});

router.put("/:id", validateSession, (req, res) => {
  const updateLogEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
  };
  const query = {
    where: {
      id: req.params.id, owner: req.user.id
    }
  };
  Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json ({error:err}));
});

router.delete("/:id", validateSession, (req, res) => {
  const query = {
    where: {
      id: req.params.id, owner: req.user.id
    }};
  Log.destroy(query)
    .then(() => res.status(200).json({message: "Log Entry Deleted"}))
    .catch((err) => res.status(500).json({error: err}));
})

module.exports = router;
