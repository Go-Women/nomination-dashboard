const { makeDb } = require('../asyncdb.js');

module.exports = async function (context, req) {
    const nomID = context.bindingData.id;

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
        const firstName = `${req.body.firstName}`;
        const lastName = `${req.body.lastName}`;
        const nomStatus = `${req.body.nomStatus}`;

        const rows = await db.query(sqlQuery, [firstName, lastName, nomStatus, nomID]);
        if (rows.length != 0) {
            context.res = {
                status: 200,
                body: "OK",
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        } else {
            context.res = {
                status: 404,
                body: "Not Found"
            };
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

const sqlQuery = `
UPDATE 
    Nominees
SET
    firstName = ?,
    lastName = ?,
    nomStatus = ?
WHERE
    ID = ?
`;
