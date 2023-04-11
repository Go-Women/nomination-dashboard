const utils = require('../utils.js');
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
        const id = req.body.nomineeID;
        const verdict = req.body.data;
        await db.query(sqlQuery, [
            verdict,
            id
        ]);
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

const sqlQuery = `
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
