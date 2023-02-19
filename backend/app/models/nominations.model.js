const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Nomination = function(nomination) {
  this.date = nomination.date;
  this.authorFirst = nomination.authorFirst;
  this.authorLast = nomination.authorLast;;
  this.authorEmail = nomination.authorEmail;
  this.nomFirst = nomination.nomFirst;
  this.nomLast = nomination.nomLast;
  this.nomYOB = nomination.nomYOB;
  this.cohort = nomination.cohort;
  this.category = nomination.category;
  this.subcategory = nomination.subcategory;
  this.subcategoryOther = nomination.subcategoryOther;
  this.nomQ1Description = nomination.nomQ1Description;
  this.nomQ2Description = nomination.nomQ2Description;
  this.nomQ3Description = nomination.nomQ3Description;
  this.nomDeceased = nomination.nomDeceased;
  this.nomAchieved = nomination.nomAchieved;
  this.nomAdditionalInfo = nomination.nomAdditionalInfo;
};

Nomination.create = (newNomination, result) => {
  sql.query("INSERT INTO Nominations SET ?", newNomination, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created nomination: ", { ...newNomination });
    result(null, { ...newNomination });
  });
};

Nomination.findById = (id, result) => {
  sql.query(`SELECT * FROM Nominations WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      utils.formatSingleData(res[0])
      console.log(`GET /nominations/${id}`);
      result(null, res[0]);
      return;
    }

    // not found Nomination with the id
    result({ kind: "not_found" }, null);
  });
};

Nomination.getAll = result => {
  sql.query("SELECT * FROM Nominations", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    utils.formatAllData(res);
    console.log("GET /nominations");
    result(null, res);
  });
};

Nomination.updateById = (id, nomination, result) => {
  // TODO: Needs to be implemented
  // sql.query(
  //   "UPDATE Nominations ",
  //   [],
  //   (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }

  //     if (res.affectedRows == 0) {
  //       // not found Nomination with the id
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }

  //     console.log("updated nomination: ", { id: id, ...nomination });
  //     result(null, { id: id, ...nomination });
  //   }
  // );
};

module.exports = Nomination;
