const sql = require("../../config/db.js");
const utils = require("./utils.model.js");

// constructor
const Judge = function(judge) {
  this.id = judge.ID;
  this.type = judge.type;
  this.email = judge.email;
  this.firstName = judge.firstName;
  this.lastName = judge.lastName;
  this.active = judge.active;
  this.info = judge.data;
};

Judge.create = (newJudge, result) => {
  sql.query("INSERT INTO Users SET ?", newJudge, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created judge: ", { ...newJudge });
    result(null, { ...newJudge });
  });
};

Judge.findById = (id, result) => {
  sql.query(`SELECT * FROM Users WHERE id = ${id} AND type='judge'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log(res);
    if (res.length) {
      
      utils.formatSingleData(res[0], 'judge');
      console.log(`GET /judges/${id}`);
      result(null, res[0]);
      return;
    }

    // not found Judge with the id
    result({ kind: "not_found" }, null);
  });
};

Judge.getAll = result => {
  sql.query("SELECT * FROM Users WHERE type = 'judge'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    
    utils.formatAllData(res, 'judge');
    console.log("GET /judges");
    result(null, res);
  });
};

Judge.getMatchingDataById = (id, result) => {
  sql.query(`SELECT info, concat(firstName,' ',lastName) as judgeName FROM Users WHERE id = ? AND type = 'judge'`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      utils.formatSingleData(res[0], 'judge');
      utils.getJudgeMatchingData(res[0]);
      // console.log(`GET /judge/${id}`);
      result(null, res[0]);
      return;
    }

    // not found Nominee with the id
    result({ kind: "not_found" }, null);
  });
};

Judge.updateById = (id, judge, result) => {
  utils.formatJudgeInput(judge);

  sql.query(
    "UPDATE Users SET info = ?, active = ?, email = ? WHERE id = ? AND type ='judge'",
    [judge.info, judge.active, judge.email, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Judge with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated judge: ", { id: id, ...judge });
      result(null, { id: id, ...judge });
    }
  );
};

module.exports = Judge;
