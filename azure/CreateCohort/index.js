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
        const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date();
        const inductionYear = req.body.inductionYear ? req.body.inductionYear : "Unknown";

        // End previous cohort
        await db.query(endQuery, startDate);

        // Start new cohort
        const newCohort = { startDate: startDate, endDate: startDate, inductionYear: inductionYear };
        await db.query("INSERT INTO Cohort SET ?", newCohort);
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

const endQuery = `
UPDATE Cohort
SET endDate = ?
WHERE id = (
        SELECT id
        FROM (
                SELECT id
                FROM Cohort
                ORDER BY id DESC
                LIMIT 1
            ) AS t
    )
`;
