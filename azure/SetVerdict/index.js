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
        const nomID = req.body.nomineeID;
        const verdict = req.body.data;
        const matchID = req.body.matchID;
        const nomStatus = req.body.nomStatus;

        await db.query(sqlQuery1, [
            verdict,
            nomStatus,
            nomID
        ]);
        await db.query(sqlQuery2, matchID);
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
            body: "A database error occured."
        };
    } finally {
        await db.close();
        context.done();
    }
}

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
  ),
  nomStatus = IF(JSON_LENGTH(verdict) = capacity, 'm500', ?)
WHERE 
  id = ?
`;

const sqlQuery2 = `
UPDATE 
  Matches 
SET
  matchStatus = 'm500'
WHERE
  ID = ?
`;
