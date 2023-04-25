const { makeDb } = require('../asyncdb.js');
const utils = require('../utils');

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
        const nomID = req.body.nomineeID;
        const verdict = req.body.data;
        const matchID = req.body.matchID;
        var nomStatus = req.body.nomStatus;

        await db.query(sqlQuery1, [verdict, nomID]);
        await db.query(sqlQuery2, matchID);
        var results = db.query(sqlQuery3, nomID);

        if (results.length > 0) {
          if (results[0].votes.length == 3) {
            var acceptedCount = 0;
            for (const i of results[0].votes) {
              if (i === "1")
                acceptedCount++;
            }
            nomStatus = (acceptedCount == 3) ? 'm500': 'n400';
          } else {
            utils.getCodes(nomStatus);
          }
        } else {
          utils.getCodes(nomStatus);
        }

        await db.query(sqlQuery4, [nomStatus, nomID]);
        context.res = {
            status: 200,
            body: "OK",
            headers: {
                'Content-Type': 'application/json'
            }
        }
    } catch (err) {
        context.res = {
            status: 500,
            body: "A database error occurred."
        };
    } finally {
        await db.close();
        context.done();
    }
}

// add verdict
const sqlQuery1 = `
UPDATE 
  Nominees 
SET 
  verdict = IF(
    verdict IS NULL 
    OR JSON_TYPE(verdict) != 'ARRAY', 
    JSON_ARRAY(), 
    verdict
  ), 
  verdict = JSON_ARRAY_APPEND(
    verdict, 
    '$', 
    CAST(? AS JSON)
  )
WHERE 
  id = ?
`;

// update match status
const sqlQuery2 = `
UPDATE 
  Matches 
SET
  matchStatus = 'm500'
WHERE
  ID = ?
`;

// get the verdicts
const sqlQuery3 = `
SELECT
  JSON_EXTRACT(verdict, '$[*].verdict') AS votes
FROM 
  Nominees
WHERE 
  ID = 1
LIMIT 1
`;

// set the nom status
const sqlQuery4 = `
UPDATE
  Nominees
SET 
  nomStatus = ?
WHERE 
  ID = ?
`;
