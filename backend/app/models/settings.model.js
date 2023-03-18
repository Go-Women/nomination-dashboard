const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Cohort = function(cohort) {
  // TODO: implement
};

Cohort.create = (newCohort, result) => {
  // TODO: implement
  // utils.getCodes(newCohort);
  // utils.clean(newCohort);
  // sql.query("INSERT INTO Cohorts SET ?", newCohort, (err, res) => {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }

  //   console.log("created cohort: ", { ...newCohort });
  //   result(null, { ...newCohort });
  // });
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
