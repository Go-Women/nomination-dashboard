const utils = require('../utils.js');
const { makeDb } = require('../asyncdb.js');

module.exports = async function (context, req) {
    const judgeId = context.bindingData.id;

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
        const rows = await db.query(sqlQuery, judgeId);
        utils.formatAllData(rows, 'nominee');
        utils.setMatchingStatus(rows);
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
            body: "A database error occured."
        };
    } finally {
        await db.close();
        context.done();
    }
}
const sqlQuery = `
SELECT
    concat(n.firstName,' ',n.lastName) AS fullName, 
    n.category, 
    IFNULL(n.subcategory,n.subcategoryOther) AS subcategory,
    m.matchStatus,
    m.ID
FROM 
    Nominees as n
    INNER JOIN 
        Matches as m 
            ON 
                n.ID = m.nomineeID
WHERE 
    m.judgeID = ? AND
    n.cohort = (
        SELECT 
          MAX(id) 
        FROM 
          Cohort
      )
`;
