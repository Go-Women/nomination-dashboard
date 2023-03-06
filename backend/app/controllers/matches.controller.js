const Match = require("../models/matches.model.js");

// Create and Save a new Match
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Match
    const match = new Match({
        nomineeID: req.body.nomineeID,
        judgeID: req.body.judgeID,
        matchStatus: 'm400'
    });
  
    // Save Match in the database
    Match.create(match, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Match."
        });
      else res.send(data);
    });
};

exports.generate = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // console.log(req.body.judgeStatus);
  
    Match.updateStatus(`${req.body.judgeStatus}`, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Status not found for Matches ${req.body.judgeStatus}`
          });
        } else {
          res.status(500).send({
            message: `Error updating Matches with status ${req.body.judgeStatus}` 
          });
        }
      } else res.send(data);
    });
};

// Retrieve all matches from the database for frontend
exports.findAll = (req, res) => {
  Match.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    else 
        res.send(data);
     // TODO: implement getting match information
  });
};

// Retrieve all matches from the database for backend
exports.findAlMatches = (req, res) => {
  Match.getAllMatches((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    else res.send(data);
  });
};

// Find a single Match with a id
exports.findOne = (req, res) => {
    // TODO: implement this
  Match.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No match found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving Match with id ${req.params.id}`
        });
      }
    } else res.send(data);
  });
};

// Update a Match identified by the id in the request
exports.update = (req, res) => {
  // TODO: Implement
};