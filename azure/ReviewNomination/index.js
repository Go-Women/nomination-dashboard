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
        const data = req.body;
        // context.res = {
        //     status: 200,
        //     body: data
        // };
        switch (data['action']) {
            case 'REJECT':
                // Mark the nomination as rejected
                const rows = await db.query("UPDATE Nominations SET nomStatus = ? WHERE id = ?", [
                    "n500",
                    data.nominationID
                ]);
                context.res = {
                    status: 200,
                    body: "OK"
                };
                break;
            case 'MERGE':
                // Merge the nomination into the nominee
                const nomineeRows = await db.query("SELECT *, concat(firstName,' ',lastName) as fullName FROM Nominees WHERE id = ?", data.nomineeID);
                if (nomineeRows.length === 0) {
                    context.res = {
                        status: 404,
                        body: "Nominee Not Found"
                    };
                    break;
                }
                const nominee = nomineeRows[0];
                await merge(nominee.ID, nominee, data.nominations, db);
                await updateStatus(data['nominationID'], "n200", db);
                context.res = {
                    status: 200,
                    body: "OK"
                };
                break;
            case 'CREATE': 
                data['cohort'] = data['cohort'] || 4;
                data['subcategory'] = data['subcategory'] || null;
                data['subcategoryOther'] = data['subcategoryother'] || null;
                data['nomStatus'] = "n200";
                await updateStatus(data['nominationID'], data['nomStatus'], db);
                // Clean up for creation
                delete data['action'];
                delete data['nominationID'];
                // Create the nominee
                await createNominee(data, db);
                context.res = {
                    status: 200,
                    body: r
                };
                break;
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

async function merge(id, nominee, nomination, db) {
    utils.merge(nominee, nomination);
    await db.query("UPDATE Nominees SET nomStatus = ?, nominations = ? WHERE id = ?", [
        nominee['nomStatus'],
        nominee['nominations'],
        id
    ]);
}

async function updateStatus(id, status, db) {
    await db.query("UPDATE Nominations SET nomStatus = ? WHERE id = ?", [
        status,
        id
    ]);
}

async function createNominee(newNominee, db, r) {
    utils.getCodes(newNominee);
    utils.clean(newNominee);
    await db.query("INSERT INTO Nominees SET ?", newNominee);
}
