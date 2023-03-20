const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Cohort = function(cohort) {
  this.startDate = nomination.startDate;
  this.endDate = null;
};

Cohort.create = (newCohort, result) => {
  sql.query("UPDATE Cohort SET endDate = ? WHERE id = (SELECT MAX(id) FROM Cohort)", newCohort.startDate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Ended old cohort");
    result(null);
  });

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
