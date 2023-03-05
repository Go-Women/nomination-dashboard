const sql = require("../../config/db.js");
const utils = require("./utils.model.js");


// constructor
const Match = function(match) {
  this.nomineeID = match.nomineeID;
  this.nomineeID = match.nomineeID;
};

Match.create = (newMatch, result) => {
  sql.query("INSERT INTO Matches SET ?", newMatch, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created match: ", { ...newMatch });
    result(null, { ...newMatch });
  });
};

Match.findById = (id, result) => {
  sql.query(`SELECT m.nomineeID, m.judgeID, 
  n.category, n.subcategory, n.subcategoryOther,
  concat(n.firstName,' ',n.lastName) as nomFullName, concat(j.firstName,' ',j.lastName) as judgeFullName,
  j.info
  FROM Matches AS m 
  INNER JOIN Nominees AS n ON m.nomineeID = n.ID
  INNER JOIN Users AS j ON m.judgeID = j.ID
  WHERE m.ID = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      utils.formatSingleData(res[0], 'nominee');
      utils.formatSingleData(res[0], 'judge');
      utils.getMatchingData(res[0]);
      console.log(`GET /match/${id}`);
      result(null, res[0]);
      return;
    }

    // not found Match with the id
    result({ kind: "not_found" }, null);
  });
};

Match.getAll = result => {
// TODO: need to grab the categories, subcategories, and capacity
  sql.query(`SELECT m.nomineeID, m.judgeID, 
    n.category, n.subcategory, n.subcategoryOther,
    concat(n.firstName,' ',n.lastName) as nomFullName, concat(j.firstName,' ',j.lastName) as judgeFullName,
    j.info
    FROM Matches AS m 
    INNER JOIN Nominees AS n ON m.nomineeID = n.ID
    INNER JOIN Users AS j ON m.judgeID = j.ID
    WHERE j.type = 'judge' AND j.active = true`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        utils.formatAllData(res, 'nominee');
        utils.formatAllData(res, 'judge');
        utils.getAllJudgesMatchingData(res);
        console.log("GET /matches");
        result(null, res);
  });
};

Match.updateById = (id, nominee, result) => {
  // TODO: Needs to be implemented
};

module.exports = Match;
