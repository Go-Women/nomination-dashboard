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
        const id = `${req.body.id}`
        const nomID = `${req.body.nomID}`
        const judgeID = `${req.body.judgeID}`
        const cat = `${req.body.cat}`;

        const data = [id, nomID, judgeID, cat];

        // update nominee
        await db.query(sqlQuery1, data[2]);

        // update judge
        await db.query(sqlQuery2, [data[3], data[1]]);

        // update match
        await db.query("UPDATE Matches SET matchStatus = 'm400' WHERE ID = ?", data[0]);
       
        context.res = {
            status: 200,
            body: "OK",
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
UPDATE
    Nominees
SET 
    nomStatus = IF(? = 'Other', 'm200', 'n200'), 
    matchesAssigned = matchesAssigned - 1
WHERE 
    ID = ?
`;

const sqlQuery2 = `
UPDATE 
    Users
SET 
    info = JSON_SET(info,'$.judgeStatus','j300'),
    info = JSON_SET(info,'$.matchesAssigned', JSON_EXTRACT(info, '$.matchesAssigned' - 1))
    WHERE ID = ?
`;
