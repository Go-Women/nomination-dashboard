const Nominee = require("../models/nominees.model.js");
const Nomination = require("../models/nominations.model.js");

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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      cohort: req.body.cohort || 4, // TODO: change this when cohort is implemented
      nomStatus: "Reviewed",
      yob: req.body.yob,
      category: req.body.category,
      subcategory: req.body.subcategory || null,
      subcategoryOther: req.body.subcategoryOther || null,
      nominations: req.body.nominations
    });

    Nomination.updateStatus(req.body.nominationID, nominee.nomStatus, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Nomination not found with id ${req.body.nominationID}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Nomination with id ${req.body.nominationID}`
          });
        }
      } else {
        // Save Nominee in the database
        Nominee.create(nominee, (nomErr, data) => {
          if (nomErr)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Nominee."
            });
          else res.send(data);
        });
      }
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