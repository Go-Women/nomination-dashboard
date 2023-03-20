const Cohort = require("../models/settings.model.js");

// Create and Save a new Cohort
exports.createCohort = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Cohort
  const cohort = new Cohort({
    startDate: req.body.startDate || new Date(),
  });

  // Save Cohort in the database
  Cohort.create(cohort, (nomErr, data) => {
    if (nomErr)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cohort."
      });
    else res.send(data);
  });
};

// Retrieve all Cohorts from the database
exports.findAllCohorts = (req, res) => {
  Cohort.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cohorts."
      });
    else res.send(data);
  });
};

// Update a Cohort identified by the id in the request
exports.update = (req, res) => {
  // TODO: Implement
};