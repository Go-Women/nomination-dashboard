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
  this.nomQ1 = nomination.nomQ1;
  this.nomQ2 = nomination.nomQ2;
  this.nomQ3 = nomination.nomQ3;
  this.subcategoryOther = nomination.subcategoryOther;
  this.nomQ1Description = nomination.nomQ1Description;
  this.nomQ2Description = nomination.nomQ2Description;
  this.nomQ3Description = nomination.nomQ3Description;
  this.nomDeceased = nomination.nomDeceased;
  this.nomAchieved = nomination.nomAchieved;
  this.nomAdditionalInfo = nomination.nomAdditionalInfo;
};

Nomination.create = (newNomination, result) => {
  utils.clean(newNomination);
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

Nomination.createNominee = (newNominee, id, result) => {
  `INSERT INTO Nominees (firstName, lastName, yob, category, subcategory, subcategoryOther)
   SELECT nomFirst, nomLast, nomYOB, category, subcategory, subcategoryOther FROM Nominations WHERE ID = ?`
  sql.query(`INSERT INTO Nominees (firstName, lastName, yob, category, subcategory, subcategoryOther)
            SELECT nomFirst, nomLast, nomYOB, category, subcategory, subcategoryOther FROM Nominations WHERE ID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
    // not found Nomination with the id
    console.log("created nomination: ", { ...newNomination });
    result(null, { ...newNomination });
    }

  });
  // sql.query("INSERT INTO Nominees SET ?", newNomination, (err, res) => {

  // });
};

Nomination.findById = (id, result) => {
  sql.query(`SELECT ID, DATE_FORMAT(date, "%m/%d/%Y") as date, authorFirst, authorLast, authorEmail, 
  nomFirst, nomLast, cohort, category, subcategory, subcategoryOther, nomQ1, nomQ1Description, nomQ2, nomQ2Description, nomQ3, nomQ3Description, nomDeceased, nomAchieved, nomAdditionalInfo
  FROM Nominations WHERE id = ?`, id, (err, res) => {
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

Nomination.updateStatus = (id, status, result) => {
  sql.query(
    "UPDATE Nominations SET nomStatus = ? WHERE id = ?",
    [status, `${BigInt(id)}`],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Nomination with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated nomination: ", { id: id, status: status});
      result(null, { id: id, ...status });
    }
  );
}

Nomination.updateById = (id, nomination, result) => {
  // TODO: Needs to be implemented
  sql.query("UPDATE Nominations SET nomQ1Description = ?, nomQ2Description = ?, nomQ3Description = ? WHERE id = ?", 
  [nomination.nomQ1Description, nomination.nomQ2Description, nomination.nomQ3Description, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Nomination with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated nomination: ", { id: id, ...nomination });
      result(null, { id: id, ...nomination });
    }
  );
};

module.exports = Nomination;
