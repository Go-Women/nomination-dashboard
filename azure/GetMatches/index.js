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

        if (rows.length != 0) {
          utils.formatAllData(rows, 'nominee');
          utils.formatAllData(rows, 'judgeMatch');
          utils.setMatchingStatus(rows);
        } else {
          rows = [{
            matchStatus: 'Unmatched'
          }]
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
  m.ID,
  m.matchStatus, 
  m.nomineeID, 
  m.judgeID, 
  n.category, 
  n.subcategory, 
  n.subcategoryOther, 
  n.matchesAssigned, 
  n.capacity, 
  concat(n.firstName, ' ', n.lastName) as nomFullName, 
  concat(j.firstName, ' ', j.lastName) as judgeFullName, 
  JSON_UNQUOTE(JSON_EXTRACT(j.info, '$.category')) AS judgeCategory, 
  JSON_UNQUOTE(JSON_EXTRACT(j.info, '$.subcategory')) AS judgeSubcategory, 
  JSON_UNQUOTE(JSON_EXTRACT(j.info, '$.matchesAssigned')) AS judgeMatchesAssigned, 
  JSON_UNQUOTE(JSON_EXTRACT(j.info, '$.capacity')) AS judgeCapacity 
FROM 
  Matches AS m 
  INNER JOIN Nominees AS n ON m.nomineeID = n.ID 
  INNER JOIN Users AS j ON m.judgeID = j.ID 
WHERE 
  j.type = 'judge' 
  AND j.active = true 
  AND n.Cohort = (
    SELECT 
      MAX(id) 
    FROM 
      Cohort
  ) 
  AND m.matchStatus = 'm300'
`;
