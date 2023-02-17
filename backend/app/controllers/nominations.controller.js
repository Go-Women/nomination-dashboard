const Nomination = require("../models/nominations.model.js");

// Create and Save a new Nomination
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Nomination
    // we should format the data here
    const nomination = new Nomination({
      date: req.body.date || new Date(),
      authorFirst: req.body.authorFirst,
      authorLast: req.body.authorLast,
      authorEmail: req.body.authorEmail,
      nomFirst: req.body.nomFirst,
      nomLast: req.body.nomLast,
      nomYOB: req.body.nomYOB,
      cohort: req.body.cohort || 1,
      category: req.body.category,
      subcategory: req.body.subcategory,
      subcategoryOther: req.body.subcategoryOther,
      nomQ1Description: req.body.nomQ1Description,
      nomQ2Description: req.body.nomQ2Description,
      nomQ3Description: req.body.nomQ3Description,
      nomDeceased: req.body.nomDeceased,
      nomAchieved: req.body.nomAchieved,
      nomAdditionalInfo: req.body.nomAdditionalInfo
    });
  
    // Save Nomination in the database
    Nomination.create(nomination, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Nomination."
        });
      else res.send(data);
    });
};

// Retrieve all Nominations from the database
exports.findAll = (req, res) => {
  Nomination.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Nominations."
      });
    else res.send(data);
  });
};

// Find a single Nomination with a id
exports.findOne = (req, res) => {
  Nomination.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No found Nomination with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Nomination with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Nomination identified by the id in the request
exports.update = (req, res) => {
  // TODO: Implement
};