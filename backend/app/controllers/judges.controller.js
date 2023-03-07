const Judge = require("../models/judges.model.js");

// Create and Save a new Judge
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Judge
    const judge = new Judge({
      type: req.body.type || "judge",
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      active: req.body.active || false,
      info: req.body.info
    });
  
    // Save Judge in the database
    Judge.create(judge, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Judge."
        });
      else res.send(data);
    });
};

// Retrieve all Judges from the database
exports.findAll = (req, res) => {
  Judge.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Judges."
      });
    else res.send(data);
  });
};

// Find a single Judge with a id
exports.findOne = (req, res) => {
  Judge.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No judge found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Judge with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Judge identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Judge.updateById(
    req.params.id,
    new Judge(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Judge with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Judge with id ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  )
};

exports.review = (req, res) => {
  let info = JSON.parse(`${req.body.info}`);
  switch (req.body.action) {
    case 'ACCEPT':
      console.log(`Accepting judge ${req.body.judgeID}`);
      info.judgeStatus = 'j300';
      Judge.updateInfo(true, `${req.body.judgeID}`, info, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({ message: `Not found Judge with id ${req.body.judgeID}.` });
          } else {
            res.status(500).send({ message: `Error updating Judge with id ${req.body.judgeID}` });
          }
        } else { res.send(data) };
      });
      break;
    case 'REJECT':
      console.log(`Rejecting judge ${req.body.judgeID}`);
      info['judgeStatus'] = 'j400';
      Judge.updateInfo(false, `${req.body.judgeID}`, info, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({ message: `Not found Judge with id ${req.body.judgeID}.` });
          } else {
            res.status(500).send({ message: `Error updating Judge with id ${req.body.judgeID}` });
          }
        } else { res.send(data) };
      });
      break;
  }
}
