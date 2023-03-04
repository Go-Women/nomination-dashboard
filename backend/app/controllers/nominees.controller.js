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
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      cohort: req.body.data.cohort || 4, // TODO: change this when cohort is implemented
      nomStatus: "Reviewed",
      yob: req.body.data.yob,
      category: req.body.data.category,
      subcategory: req.body.data.subcategory || null,
      subcategoryOther: req.body.data.subcategoryOther || null,
      nominations: req.body.data.nominations
    });

    Nominee.updateStatus(req.body.data.nomID, nominee.nomStatus, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Nomination not found with id ${req.body.nomID}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Nomination with id ${req.body.nomID}`
          });
        }
      } else {
        res.send(data);
        // Save Nominee in the database
        Nominee.create(nominee, (nomErr, nomData) => {
          if (nomErr)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Nominee."
            });
          else res.send(nomData);
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