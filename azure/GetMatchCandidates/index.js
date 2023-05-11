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
        let judgeRows = await db.query(judgeQuery);
        let nomineeRows = await db.query(nomineeQuery);

        utils.formatAllData(judgeRows, "judges");
        utils.formatAllData(nomineeRows, "nominee");

        const candidates = {
            judges: judgeRows,
            nominees: nomineeRows
        };

        context.res = {
            status: 200,
            body: candidates,
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

const judgeQuery = `
SELECT 
  ID AS judgeID, 
  concat(firstName, ' ', lastName) AS fullName, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.category")) AS judgeCategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.subcategory")) AS judgeSubcategory, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.matchesAssigned")) AS judgeMatchesAssigned, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.capacity")) AS judgeCapacity, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.judgeStatus")) AS judgeStatus, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.bio")) AS bio, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.linkedin")) AS linkedin, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.addInfo")) AS addInfo, 
  JSON_UNQUOTE(JSON_EXTRACT(info, "$.previousJudge")) AS previousJudge
FROM 
  Users 
WHERE 
  type = 'judge' 
  AND active = true 
  AND JSON_EXTRACT(info, "$.judgeStatus") = 'j300' 
  AND JSON_EXTRACT(info, "$.matchesAssigned") < JSON_EXTRACT(info, "$.capacity")
`;

const nomineeQuery = `
SELECT 
  ID AS nomineeID, 
  category, 
  subcategory, 
  nomStatus, 
  matchesAssigned, 
  capacity,
  cohort 
FROM 
  Nominees 
WHERE 
  nomStatus = 'n200' 
  AND subcategoryOther IS NULL
`;
