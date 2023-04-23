const utils = require('../utils.js');
const { makeDb } = require('../asyncdb.js');

module.exports = async function (context, req) {
    const matchId = context.bindingData.id;

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
        const rows = await db.query(sqlQuery, matchId);
        if (rows.length > 0) {
            const match = rows[0];
            utils.formatSingleData(match, 'nominee');
            utils.formatSingleData(match, 'judge');
            utils.getMatchingData(match);
            context.res = {
                status: 200,
                body: match,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            context.res = {
                status: 404,
                body: "Judge not found."
            };
        }
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

const sqlQuery = `
SELECT 
  m.matchStatus, 
  m.nomineeID, 
  m.judgeID, 
  n.category, 
  n.subcategory, 
  n.subcategoryOther, 
  concat(n.firstName, ' ', n.lastName) as nomFullName, 
  concat(j.firstName, ' ', j.lastName) as judgeFullName, 
  j.info 
FROM 
  Matches AS m 
  INNER JOIN Nominees AS n ON m.nomineeID = n.ID 
  INNER JOIN Users AS j ON m.judgeID = j.ID 
WHERE 
  m.ID = ?
`
