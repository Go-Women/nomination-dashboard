const Nomination = require("../models/nominations.model.js");
const Nominee = require("../models/nominees.model.js");

// TODO: error handling figure out how to handle errors messages and set success status

// Create and Save a new Nomination
exports.create = (req, res) => {
  // // Validate request
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
    cohort: req.body.cohort || 4,
    category: req.body.category,
    subcategory: req.body.subcategory || null,
    subcategoryOther: req.body.subcategoryOther || null,
    nomQ1: req.body.nomQ1,
    nomQ2: req.body.nomQ2,
    nomQ3: req.body.nomQ3,
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

exports.review = (req, res) => {
  console.log("REVIEWING!", req.body.action);

  switch (req.body.action) {
    case 'MERGE':
      console.log(`Merging nomination ${req.body.nominationID} into nominee ${req.body.nomineeID}.`);
      // TODO
      Nominee.findById(`${req.body.nomineeID}`, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Nomination with id ${req.body.nomineeID}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Nomination with id ${req.body.nomineeID}`
            });
          }
        } else {
          // TODO: handle merging data
          Nominee.merge(data.ID, data, `${req.body.nominations}`, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Nomination with id ${req.body.date.nominationId}.`
                });
              } else {
                res.status(500).send({
                  message: `Error updating Nomination with id ${req.params.id}`
                });
              }
            } else {
              Nomination.updateStatus(`${req.body.nominationID}`, 'n200', (err, data) => {
                if (err) {
                  if (err.kind === "not_found") {
                    res.status(404).send({
                      message: `Not found Nomination with id ${req.body.nominationId}.`
                    });
                  } else {
                    res.status(500).send({
                      message: `Error updating Nomination with id ${req.body.nominationId}`
                    });
                  }
                } else res.send(data);
              });
            }
          });
        }
      });
      // res.status(200).send("OK");
      break;
    case 'REJECT':
      console.log(`Rejecting nomination ${req.body.nominationID}.`);
      Nomination.updateStatus(`${req.body.nominationID}`, `n500`, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Nomination with id ${req.body.nominationId}.`
            });
          } else {
            res.status(500).send({
              message: `Error updating Nomination with id ${req.body.nominationId}`
            });
          }
        } else res.send(data);
      });
      // res.status(200).send("OK");
      break;
    default:
      req.status(400).send("Invalid action provided.")
      break;
  }


};

// Update a Nomination identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Nomination.updateById(
    req.body.nomID,
    new Nomination(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Nomination with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Error updating Nomination with id ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  )
};

