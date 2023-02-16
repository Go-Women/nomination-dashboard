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
      id: req.body.ID,
      type: res.body.type,
      email: res.body.email,
      firstName: res.body.firstName,
      lastName: res.body.lastName,
      active: res.body.active,
      info: res.body.data
    });
  
    // Save Judge in the database
    Judge.create(nomination, (err, data) => {
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
  // TODO: Implement
};