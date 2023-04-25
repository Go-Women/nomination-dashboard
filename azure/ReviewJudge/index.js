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
        const judge = req.body;
        const judgeId = judge.judgeID;
        const infoIn = JSON.parse(req.body['info']);
        let active = false;

        const retrieved = await db.query("SELECT info FROM Users WHERE id = ?", judgeId);
        if (retrieved.length > 0) {
            const info = JSON.parse(retrieved[0].info);
            for (const property in infoIn) {
                info[property] = infoIn[property];
            }
            context.res = {
            status: 200,
            body: infoIn,
            headers: {
                'Content-Type': 'application/json'
            }
        };
            switch (judge.action) {
                case 'ACCEPT':
                    info['judgeStatus'] = 'j300';
                    info['previousJudge'] = true;
                    utils.getCodes(info, 'judge');
                    active = true;
                    break;
                case 'REJECT':
                    info['judgeStatus'] = 'j400';
                    active = false;
                    break;
                default: break;
            }
            const rows = await db.query("UPDATE Users SET active = ?, info = ?  WHERE id = ?", [
                active,
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
            body: err.message
        };
    } finally {
        await db.close();
        context.done();
    }
}
