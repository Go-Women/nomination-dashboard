const sql = require("../../config/db.js");
const utils = require("./utils.model.js");
const matching = require("./matching.js");

// constructor
const Match = function(match) {
  this.nomineeID = match.nomineeID;
  this.judgeID = match.judgeID;
  this.matchStatus = matchStatus.firstName;
};


Match.create = (newMatches, results) => {
  // insert matches into the database
  sql.query("INSERT INTO Matches (nomineeID, judgeID, matchStatus) VALUES ?", [newMatches], (err, res) => {
    if (err) {
      console.log("error: ", err);
      results(err, null);
      return;
    }

    console.log("created matches: ", { ...newMatches });
    // TODO: update nominee and judge statues and capacities
    for (const match of newMatches) {
      // console.log(match);
      sql.query(`UPDATE Nominees, Users
        SET Nominees.nomStatus = IF((Nominees.matchesAssigned + 1) = 3, 'm300', 'n200'), 
        Users.info = IF((JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1) = JSON_EXTRACT(Users.info, '$.judgeCapacity'), JSON_SET(Users.info,'$.judgeStatus','m300'), JSON_SET(Users.info,'$.judgeStatus','j300')),
        Nominees.matchesAssigned = Nominees.matchesAssigned + 1,
        Users.info = JSON_SET(Users.info, '$.matchesAssigned', JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1)
        WHERE Nominees.ID = ? AND Users.ID = ?`, 
        [match[0], match[1]],(err, matched) => {
          if (err) {
            console.log("error: ", err);
            results(err, null);
            return;
          }

          console.log("updated match: ", {match: match[0]})

          sql.query(`UPDATE Users
            SET info = IF((JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1) = JSON_EXTRACT(Users.info, '$.judgeCapacity'), JSON_SET(Users.info,'$.judgeStatus','m300'), JSON_SET(Users.info,'$.judgeStatus','j300'))
            WHERE ID = ?`, 
            match[1],(err, test) => {
          if (err) {
            console.log("error: ", err);
            results(err, null);
            return;
          }
          console.log("updated match: ", {matches: match[1]})
        });
      });
    }
    results(null, { ...newMatches });
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
  // get all matches in the matching table that are marked as matched
  sql.query(`SELECT m.matchStatus, m.nomineeID, m.judgeID, 
  n.category, n.subcategory, n.subcategoryOther, n.matchesAssigned, n.capacity, concat(n.firstName,' ',n.lastName) as nomFullName,
  concat(j.firstName,' ',j.lastName) as judgeFullName,
  JSON_UNQUOTE(JSON_EXTRACT(j.info,'$.category')) AS judgeCategory,
  JSON_UNQUOTE(JSON_EXTRACT(j.info,'$.subcategory')) AS judgeSubcategory,
  JSON_UNQUOTE(JSON_EXTRACT(j.info,'$.matchesAssigned')) AS judgeMatchesAssigned,
  JSON_UNQUOTE(JSON_EXTRACT(j.info,'$.capacity')) AS judgeCapacity
  FROM Matches AS m
  INNER JOIN Nominees AS n ON m.nomineeID = n.ID
  INNER JOIN Users AS j ON m.judgeID = j.ID
  WHERE j.type = 'judge' AND j.active = true AND n.Cohort = (SELECT MAX(id) FROM Cohort) AND m.matchStatus = 'm300'`, (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }
        
        // Check if their are matches that have been generated before
        if (res.length != 0) {
          utils.formatAllData(res, 'nominee');
          utils.formatAllData(res, 'judgeMatch');
          // utils.getAllJudgesMatchingData(res);
          utils.setMatchingStatus(res);
        } else {
          res = [{
            matchStatus: 'Unmatched'
          }]
        }
        console.log("GET /matches");
        result(null, res);
  });
};

Match.getAllJudges = (results) => {
  // get all judges that can be matched
  sql.query(`SELECT ID AS judgeID,
  concat(firstName,' ',lastName) AS fullName,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.category")) AS judgeCategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.subcategory")) AS judgeSubcategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.matchesAssigned")) AS judgeMatchesAssigned, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.capacity")) AS judgeCapacity,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.judgeStatus")) AS judgeStatus,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.bio")) AS bio,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.linkedin")) AS linkedin,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.addInfo")) AS addInfo,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.previousJudge")) AS previousJudge
  FROM Users
  WHERE type = 'judge' AND active = true AND
  JSON_EXTRACT(info, "$.judgeStatus") = 'j300' AND
  JSON_EXTRACT(info, "$.matchesAssigned") < JSON_EXTRACT(info, "$.capacity")`, (err, judges) => {
    if (err) {
      console.log("error: ", err);
      results(null, err);
      return;
    }
    utils.formatAllData(judges, "judges");
    console.log("GET /matches/judges");
    results(null, {...judges});
  });
}

Match.getAllNominees = (results) => {
  // get all nominees that can be matched
  sql.query(`SELECT ID AS nomineeID, category, subcategory, nomStatus, matchesAssigned, capacity
  FROM Nominees WHERE nomStatus = 'n200' AND subcategoryOther IS NULL`, (err, nominees) => {
    if (err) {
      console.log("error: ", err);
      results(null, err);
      return;
    }
    utils.formatAllData(nominees, "nominee");
    console.log("GET /matches/nominees");
    results(null, {...nominees});
  });
}

Match.getNomineesManualReview = (results) => {
  // get nominees with an Other category
  sql.query(`SELECT ID AS nomineeID, concat(firstName,' ',lastName) as fullName, category, subcategory, subcategoryOther, nomStatus, matchesAssigned, capacity
  FROM Nominees WHERE nomStatus = 'm200'`, (err, nominees) => {
  if (err) {
    console.log("error: ", err);
    results(null, err);
    return;
  }

    
    console.log("GET /matches/manual");
    if (nominees.length > 0) {
      utils.formatAllData(nominees, "nominee");
      results(null, {...nominees });
    } else
      results(null, {"0":{"nomStatus":"None"}});  // TODO: check this
  });
}

Match.getMatchesReview = (results) => {
  // get nominees that need to be matched
  sql.query(`SELECT ID AS nomineeID, category, subcategory, nomStatus, matchesAssigned, capacity,
  concat(firstName,' ',lastName) AS fullName
  FROM Nominees WHERE nomStatus = 'n200' AND subcategoryOther IS NULL`, (err, nominees) => {
  if (err) {
    console.log("error: ", err);
    results(null, err);
    return;
  }
  
  utils.getAllNomineeMatchingData(nominees);
  console.log("GET /matches/nominees");
  // get judges that need to be matched
  // JSON_UNQUOTE(JSON_EXTRACT(info, "$.bio")) AS bio,
  // JSON_UNQUOTE(JSON_EXTRACT(info, "$.linkedin")) AS linkedin,
  // JSON_UNQUOTE(JSON_EXTRACT(info, "$.addInfo")) AS addInfo,
  // JSON_UNQUOTE(JSON_EXTRACT(info, "$.previousJudge")) AS previousJudge
  sql.query(`SELECT ID AS judgeID,
  concat(firstName,' ',lastName) AS fullName,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.category")) AS judgeCategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.subcategory")) AS judgeSubcategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.matchesAssigned")) AS judgeMatchesAssigned, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.capacity")) AS judgeCapacity,
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.judgeStatus")) AS judgeStatus
  FROM Users
  WHERE type = 'judge' AND active = true AND
  JSON_EXTRACT(info, "$.judgeStatus") = 'j300' AND
  JSON_EXTRACT(info, "$.matchesAssigned") < JSON_EXTRACT(info, "$.capacity") `, (err, judges) => {
    if (err) {
      console.log("error: ", err);
      results(null, err);
      return;
    }

    utils.getAllJudgesMatchingData(judges, "data");
    console.log("GET /matches/judges");

    sql.query(`SELECT nomineeID, judgeID FROM Matches
    WHERE matchStatus = 'm300'`, (err, currentMatches) => {
    if (err) {
      console.log("error: ", err);
      results(null, err);
      return;
    }
    var result = matching.mainMatching([nominees, judges, currentMatches]);
    console.log("GET /matches/review");

      // Check if their are matches that have been generated before
      if (result.length != 0) {
        utils.formatAllData(result, "nominee");
        utils.formatAllData(result, "judgeMatch");
      } else {
        result = [{
          matchStatus: 'Unmatched'
        }]
      }
      console.log("GET /matches");
      results(null, { ...result });
      });
    });
  });
};

Match.createAllMatches = (results) => {
  // get nominees that need to be matched
  sql.query(`SELECT ID AS nomineeID, category AS nomCategory, subcategory AS nomSubcategory, subcategoryOther AS nomSubcategoryOther, nomStatus, matchesAssigned, capacity
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
      
      const result = matching.mainMatching([nominees, filteredJudges]);
      const newMatches = result[0];
      sql.query("INSERT INTO Matches (nomineeID, judgeID, matchStatus) VALUES ?", [newMatches], (err, res) => {
        if (err) {
          console.log("error: ", err);
          results(err, null);
          return;
        }
    
        // TODO: update nominee and judge statues and capacities
        console.log("created matches: ", { ...newMatches });

        // update manual review status for judges
        const judgeManualReview = result[1][1];
        for (const judge of judgeManualReview.values()) {
          Match.updateJudgeStatus(judge, 'm200', (err, data) => {
            if (err) {
              console.log("error: ", err);
              results(null, err);
              return;
            }
          });
        };
        results(null, { ...newMatches });
      });
    });
  });
};

Match.setAllManualReviews = (results) => {
  // update any nominee without 3 judges assigned to them as manual review  
  sql.query(`UPDATE Nominees as n SET n.nomStatus = 'm200'
  WHERE n.ID = (
    SELECT nomineeID FROM 
      (SELECT m.nomineeID, COUNT(m.nomineeID) as count
      FROM Matches as m
      INNER JOIN Nominees as n on n.ID = m.nomineeID
      GROUP BY m.nomineeID) AS manualReview WHERE count < 3)`, (err, nominees) => {
  if (err) {
    console.log("error: ", err);
    results(null, err);
    return;
  }
    console.log("GET /matches/other");
    results(null, { nomineeOthers: nominees });
  });
};

Match.nomineeManualReview = (id, status, result) => {
  sql.query(
    `UPDATE Nominees SET nomStatus = ?, matchesAssigned = matchesAssigned - 1
      WHERE ID = ?`, [`${status}`, `${id}`], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated nominee status: ", { nominee: `${id}`, status: `${status}` });
      result(null, { nominee: `${id}`, status: `${status}`});
    }
  );
};

Match.updateJudgeStatus = (id, status, result) => {
  //     SET m.matchStatus = ?, j.info = JSON_SET(j.info, '$.judgeStatus', ?)
  //     WHERE j.type = 'judge' AND j.ID = 1;
  sql.query(
    `UPDATE User SET info = JSON_SET(j.info, '$.judgeStatus', ?)
      WHERE j.type = 'judge' AND j.ID = ?`, [`${status}`, `${id}`],
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

      console.log("updated judge match: ", { judgeID: `${id}`, judgeStatus: `${status}` });
      result(null, { matchStatus: `${status}`});
    }
  );
};

Match.updateNomineeStatus = (id, status, result) => {
  sql.query(
    `UPDATE Nominees SET nomStatus = ?
     WHERE ID = ?`, [`${status}`, `${id}`], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Nominee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated nominee match: ", { id: `${id}`, nomStatus: `${status}` });
      result(null, { nomStatus: `${status}`});
    }
  );
};



Match.updateById = (id, nominee, result) => {
  // TODO: Needs to be implemented
};

module.exports = Match;