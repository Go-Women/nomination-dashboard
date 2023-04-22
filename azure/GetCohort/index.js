const { makeDb } = require('../asyncdb.js');

module.exports = async function (context, req) {
    const userId = context.bindingData.id;

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
        const rows = await db.query("SELECT * FROM Cohort");
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
