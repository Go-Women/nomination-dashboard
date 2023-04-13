const Match = require("../models/matches.model.js");
const matches = require("../models/matching.js");

// Create and Save a new Match
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    var matches = [];
    const judges = req.body.judges;

    // Create Matches
    for (const judge of judges) {
      matches.push([parseInt(req.body.nominee), parseInt(judge), "m300"]);
    }

    // Save Match in the database
    Match.create(matches, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Match."
        });
      else res.send(data);
    });
};

// Retrieve all nominees for manual review (nominees with subcategory other or not matched with 3 judges)
exports.findManual = (req, res) => {
  Match.getNomineesManualReview((err, data) => {
    if (err) res.status(500).send({
      message: `Some error occurred while getting other category matches.`
    });
    else
      res.send(data);
  });
};

// Retrieve all matches that do not have 3 judges assigned to them
exports.findAllManualReviews = (req, res) => {
  Match.setAllManualReviews((err, data) => {
    if (err) res.status(500).send({
      message: `Some error occurred while getting all manual review matches.`
    });
    else
      res.send(data);
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

// Retrieve all judges from the database that can be matched
exports.findAllJudges = (req, res) => {
  Match.getAllJudges((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    else
        res.send(data);
  });
};

// Retrieve all nominees from the database that can be matched
exports.findAllNominees = (req, res) => {
  Match.getAllNominees((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    else
        res.send(data);
  });
};

// Find all suggested matches
exports.findMatchesReview = (req, res) => {
  Match.getMatchesReview((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    else {
      res.send(data);
    }
  });
};

// used to update a nominees status
exports.updateNomineeStatus = (req, res) => {
  Match.updateNomineeStatus(`${req.body.nomineeID}`, `${req.body.status}`, (err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving matches."
    });
  
    res.send(data);
  });
};

// // Create all matches from the database for backend
// exports.generateMatches = (req, res) => {
//   Match.createAllMatches((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving matches."
//       });
//     else {
//       res.send(data);
//     }
//   });
// };

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

// // Update a Judges Match Status identified by the id in the request
// exports.updateJudgeStat = (id, judgeStatus) => {
//   Match.updateJudgeStatus(id, judgeStatus, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `No match found with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: `Error retrieving Match with id ${req.params.id}`
//         });
//       }
//     }
//   });
// };