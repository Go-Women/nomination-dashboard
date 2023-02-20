const Nominee = require("../models/nominees.model.js");

// Create and Save a new Nominee
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Nominee
    const nominee = new Nominee({
      id: req.body.ID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      fullName: req.body.fullName,
      cohort: req.body.cohort,
      status: req.body.data,
      yob: req.body.yob,
      category: req.body.category,
      subcategory: req.body.subcategory,
      subcategoryOther: req.body.subcategoryOther,
      nominations: req.body.nominations
    });
  
    // Save Nominee in the database
    Nominee.create(nomination, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Nominee."
        });
      else res.send(data);
    });
};

// Retrieve all Nominees from the database
exports.findAll = (req, res) => {
  Nominee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Nominees."
      });
    else res.send(data);
  });
};

// Find a single Nominee with a id
exports.findOne = (req, res) => {
  Nominee.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No nominee found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Nominee with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Nominee identified by the id in the request
exports.update = (req, res) => {
  // TODO: Implement
};