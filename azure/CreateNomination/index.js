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
        const nomination = req.body;
        const currentCohort = (await db.query(cohortQuery))[0].ID;

        nomination['cohort'] = nomination['cohort'] || currentCohort;
        nomination['subcategory'] = nomination['subcategory'] || null;
        nomination['subcategoryOther'] = nomination['subcategoryOther'] || null;
        
        const rows = await db.query("INSERT INTO Nominations SET ?", nomination);
        context.res = {
            status: 200,
            body: nomination,
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

const cohortQuery = `
SELECT *
from cohort
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
