const sql = require("../../config/db.js");
const util = require("./utils.model.js");

// constructor
const Nominee = function(nominee) {
  this.id = nominee.ID;
  this.firstName = nominee.firstName;
  this.lastName = nominee.lastName;
  this.cohort = nominee.cohort;
  this.status = nominee.data;
  this.yob = nominee.yob;
  this.category = nominee.category;
  this.subcategory = nominee.subcategory;
  this.subcategoryOther = nominee.subcategoryOther;
  this.nominations = nominee.nominations;
};

Nominee.create = (newNominee, result) => {
  sql.query("INSERT INTO Nominees SET ?", newNominee, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created nominee: ", { ...newNominee });
    result(null, { ...newNominee });
  });
};

Nominee.findById = (id, result) => {
  sql.query(`SELECT * FROM Nominees WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      util.formatSingleData(res[0], 'nominee');
      console.log(`GET /nominees/${id}`);
      result(null, res[0]);
      return;
    }

    // not found Nominee with the id
    result({ kind: "not_found" }, null);
  });
};

Nominee.getAll = result => {
  sql.query("SELECT * FROM Nominees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    util.formatAllData(res, 'nominee');
    console.log("GET /nominees");
    result(null, res);
  });
};

Nominee.updateById = (id, nominee, result) => {
  // TODO: Needs to be implemented
  // sql.query(
  //   "UPDATE nominations ",
  //   [],
  //   (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }

  //     if (res.affectedRows == 0) {
  //       // not found Nominee with the id
  //       result({ kind: "not_found" }, null);
  //       return;
  //     }

  //     console.log("updated nomination: ", { id: id, ...nomination });
  //     result(null, { id: id, ...nomination });
  //   }
  // );
};

module.exports = Nominee;
