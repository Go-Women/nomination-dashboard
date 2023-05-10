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
        let rows = await db.query(sqlQuery);
        if (rows.length > 0) {
            utils.formatAllData(rows, "nominee");
        } else {
            rows = {"0":{"nomStatus":"None"}};
        }

        context.res = {
            status: 200,
            body: rows,
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

const sqlQuery = `
SELECT 
  ID AS nomineeID, 
  concat(firstName, ' ', lastName) as fullName, 
  category, 
  subcategory, 
  subcategoryOther, 
  nomStatus, 
  matchesAssigned, 
  capacity,
  cohort 
FROM 
  Nominees 
WHERE 
  nomStatus = 'm200'
`;
