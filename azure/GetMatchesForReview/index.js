const utils = require('../utils.js');
const matching = require('../matching.js');
const { makeDb } = require('../asyncdb.js');

module.exports = async function (context, req) {
    // Set up a connection to the MySQL database
    const db = makeDb({
        host: process.env.MYSQL_CONNECTION_URL,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_USER_PASSWORD,
        database: process.env.MYSQL_DEFAULT_DATABASE,
        port: process.env.MYSQL_CONNECTION_PORT,
        ssl: true
    });
    
    try {
        let nominees = await db.query(sqlQuery1);
        utils.getAllNomineeMatchingData(nominees);

        let judges = await db.query(sqlQuery2);
        utils.getAllJudgesMatchingData(judges, "data");

        let currentMatches = await db.query(sqlQuery3);
        let result = matching.mainMatching([nominees, judges], currentMatches);
        if (result.length != 0) {
            utils.formatAllData(result, "nominee");
            utils.formatAllData(result, "judgeMatch");
        } else {
            result = [{
                matchStatus: 'Unmatched'
            }];
        }

        context.res = {
            status: 200,
            body: result,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    } finally {
        await db.close();
        context.done();
    }
}

const sqlQuery1 = `
SELECT 
  ID AS nomineeID, 
  category, 
  subcategory, 
  nomStatus, 
  matchesAssigned, 
  capacity, 
  concat(firstName, ' ', lastName) AS fullName 
FROM 
  Nominees 
WHERE 
  nomStatus = 'n200' 
  AND subcategoryOther IS NULL
`;

const sqlQuery2 = `
SELECT 
  ID AS judgeID, 
  concat(firstName, ' ', lastName) AS fullName, 
  JSON_UNQUOTE(
    JSON_EXTRACT(info, "$.category")
  ) AS judgeCategory, 
  JSON_UNQUOTE(
    JSON_EXTRACT(info, "$.subcategory")
  ) AS judgeSubcategory, 
  JSON_UNQUOTE(
    JSON_EXTRACT(info, "$.matchesAssigned")
  ) AS judgeMatchesAssigned, 
  JSON_UNQUOTE(
    JSON_EXTRACT(info, "$.capacity")
  ) AS judgeCapacity, 
  JSON_UNQUOTE(
    JSON_EXTRACT(info, "$.judgeStatus")
  ) AS judgeStatus 
FROM 
  Users 
WHERE 
  type = 'judge' 
  AND active = true 
  AND JSON_EXTRACT(info, "$.judgeStatus") = 'j300' 
  AND JSON_EXTRACT(info, "$.matchesAssigned") < JSON_EXTRACT(info, "$.capacity")
`;

const sqlQuery3 = `
SELECT 
  m.nomineeID, 
  GROUP_CONCAT(m.judgeID) AS judgeIDs
FROM 
  Matches AS m
INNER JOIN 
    Nominees AS n 
    ON 
      m.nomineeID = n.ID
WHERE 
  n.Cohort = (SELECT MAX(id) FROM Cohort) 
  AND 
  m.matchStatus = 'm300'
GROUP BY 
  m.nomineeID;
`;
