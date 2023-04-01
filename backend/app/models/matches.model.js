const sql = require("../../config/db.js");
const utils = require("./utils.model.js");
const matching = require("./matching.js");

// constructor
const Match = function(match) {
  this.nomineeID = match.nomineeID;
  this.judgeID = match.judgeID;
  this.matchStatus = matchStatus.firstName;
};


Match.create = (newMatches, result) => {
  sql.query("INSERT INTO Matches (nomineeID, judgeID, matchStatus) VALUES ?", newMatches, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // TODO: update nominee and judge statues and capacities
    console.log("created matches: ", { ...newMatches });
    result(null, { ...newMatches });
  });
};

Match.findById = (id, result) => {
  sql.query(`SELECT m.matchStatus, m.nomineeID, m.judgeID, 
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
  sql.query(`SELECT m.matchStatus, m.nomineeID, m.judgeID, 
    n.category, n.subcategory, n.subcategoryOther,
    concat(n.firstName,' ',n.lastName) as nomFullName, concat(j.firstName,' ',j.lastName) as judgeFullName,
    j.info
    FROM Matches AS m 
    INNER JOIN Nominees AS n ON m.nomineeID = n.ID
    INNER JOIN Users AS j ON m.judgeID = j.ID
    WHERE j.type = 'judge' AND j.active = true AND n.Cohort = (SELECT MAX(id) FROM Cohort)`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        // Check if their are matches that have been generated before
        if (res.length != 0) {
          utils.formatAllData(res, 'nominee');
          utils.formatAllData(res, 'judge');
          utils.getAllJudgesMatchingData(res);
          utils.setMatchingStatus(res);
        } else {
          res = [{
            matchStatus: 'm400'
          }]
        }
        console.log("GET /matches");
        result(null, res);
  });
};

Match.getAllMatches = (results) => {
  // get nominees that need to be matched
  sql.query(`SELECT ID AS nomineeID, category AS nomCategory, subcategory AS nomSubcategory, subcategoryOther AS nomSubcategoryOther, nomStatus
    FROM Nominees WHERE nomStatus = 'n200'`, (err, nominees) => {
    if (err) {
      console.log("error: ", err);
      results(null, err);
      return;
    }
    utils.getAllNomineeMatchingData(nominees);
    console.log("GET /matches/data");
    // get judges that need to be matched
    sql.query(`SELECT ID AS judgeID, info
      FROM Users WHERE type = 'judge' AND active = true`, (err, judges) => {
      if (err) {
        console.log("error: ", err);
        results(null, err);
        return;
      }

      utils.getAllJudgesMatchingData(judges, "data");
      const filteredJudges = utils.filterJudgeStatus(judges, 'j300');
      console.log("GET /matches/data");
      
      const newMatches = matching.mainMatching([nominees, filteredJudges]);
      sql.query("INSERT INTO Matches (nomineeID, judgeID, matchStatus) VALUES ?", [newMatches], (err, res) => {
        if (err) {
          console.log("error: ", err);
          results(err, null);
          return;
        }
    
        // TODO: update nominee and judge statues and capacities
        console.log("created matches: ", { ...newMatches });
        results(null, { ...newMatches });
      });
    });
  });
};

Match.updateStatus = (status, result) => {
  sql.query(
    `UPDATE Matches SET matchStatus = ?`, status,
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

      console.log("updated matches: ", { matchStatus: status });
      result(null, { matchStatus: status});
    }
  );
};

Match.updateById = (id, nominee, result) => {
  // TODO: Needs to be implemented
};

module.exports = Match;
