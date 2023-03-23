const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Cohort = function(cohort) {
  this.startDate = cohort.startDate;
  this.endDate = cohort.startDate;
};

Cohort.create = (newCohort, result) => {
  sql.query("INSERT INTO Cohort SET ?", newCohort, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cohort: ", { ...newCohort });
    result(null, { ...newCohort });
  });
};

Cohort.end = (newCohort, result) => {
  // recent = sql.query("SELECT MAX(id) FROM Cohort",[], (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }
  //   result(null);
  // });
  // console.log(recent)
    sql.query("UPDATE Cohort SET endDate = ? WHERE id = (SELECT id FROM ( SELECT id FROM Cohort ORDER BY id DESC LIMIT 1) AS t)", newCohort.startDate, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Ended old cohort");
      result(null);
    });
};

// recent = sql.query('SELECT MAX(id) FROM Cohort', (err, res) => {
//   if (err) {
//     console.log("error: ", err);
//     result(err, null);
//     return;
//   }

//   console.log(recent);
//   result(null);
// });
// sql.query("UPDATE Cohort SET endDate = ? WHERE id = ?", [newCohort.startDate, recent], (err, res) => {
//   if (err) {
//     console.log("error: ", err);
//     result(err, null);
//     return;
//   }

//   console.log("Ended old cohort");
//   result(null);
// });


Cohort.getAll = result => {
  // TODO: implement
  sql.query("SELECT * FROM Cohort", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // utils.formatAllData(res, 'cohort');
    console.log("GET /cohorts");
    result(null, res);
  });
};

module.exports = Cohort;
