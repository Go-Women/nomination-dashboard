const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Cohort = function(cohort) {
  this.startDate = nomination.startDate;
  this.endDate = null;
};

Cohort.create = (newCohort, result) => {
  // TODO: implement
  // utils.getCodes(newCohort);
  // utils.clean(newCohort);
  sql.query("UPDATE Cohorts SET endDate = ? WHERE id = (SELECT MAX(id) FROM Cohorts)", newCohort.startDate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Ended old cohort");
    result(null);
  });

  sql.query("INSERT INTO Cohorts SET ?", newCohort, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cohort: ", { ...newCohort });
    result(null, { ...newCohort });
  });
};


Cohort.getAll = result => {
  // TODO: implement
  // sql.query("SELECT *, concat(firstName,' ',lastName) as fullName FROM Cohorts", (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(null, err);
  //     return;
  //   }

  //   utils.formatAllData(res, 'cohort');
  //   console.log("GET /cohorts");
  //   result(null, res);
  // });
};

module.exports = Cohort;
