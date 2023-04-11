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
        const judge = req.body;
        const infoIn = JSON.parse(judge['info']);
        
        const retrieved = await db.query("SELECT info FROM Users WHERE id = ?", judgeId);
        if (retrieved.length > 0) {
            const info = JSON.parse(retrieved[0].info);
            for (const property in infoIn) {
                info[property] = infoIn[property];
            }
            judge['info'] = JSON.stringify(info);
            const rows = await db.query("UPDATE Users SET active = ?, email = ?, info = ? WHERE id = ? AND type ='judge'", [
                (judge['active'] ? judge['active'] : '0'),
                judge['email'],
                JSON.stringify(info),
                judgeId
            ]);
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
            body: "A database error occured."
        };
    } finally {
        await db.close();
        context.done();
    }
}
