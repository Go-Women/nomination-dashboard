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

        // nomination constructor
        const Nomination = function(nomination) {
            this.date = nomination.date;
            this.authorFirst = nomination.authorFirst;
            this.authorLast = nomination.authorLast;;
            this.authorEmail = nomination.authorEmail;
            this.nomFirst = nomination.nomFirst;
            this.nomLast = nomination.nomLast;
            this.nomYOB = nomination.nomYOB;
            this.cohort = nomination.cohort;
            this.category = nomination.category;
            this.subcategory = nomination.subcategory;
            this.subcategoryOther = nomination.subcategoryOther;
            this.nomQ1 = nomination.nomQ1;
            this.nomQ2 = nomination.nomQ2;
            this.nomQ3 = nomination.nomQ3;
            this.subcategoryOther = nomination.subcategoryOther;
            this.nomQ1Description = nomination.nomQ1Description;
            this.nomQ2Description = nomination.nomQ2Description;
            this.nomQ3Description = nomination.nomQ3Description;
            this.nomDeceased = nomination.nomDeceased;
            this.nomAchieved = nomination.nomAchieved;
            this.nomAdditionalInfo = nomination.nomAdditionalInfo;
        };
        
        const nomID = req.body.nomID;
        const nomination = new Nomination(req.body);

        await db.query(sqlQuery, [
            nomination.nomQ1Description, 
            nomination.nomQ2Description, 
            nomination.nomQ3Description, 
            nomID
        ]);

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
            body: "A database error occured."
        };
    } finally {
        await db.close();
        context.done();
    }
}

const sqlQuery = `
UPDATE 
    Nominations 
SET 
    nomQ1Description = ?,
    nomQ2Description = ?,
    nomQ3Description = ? 
WHERE 
    id = ?
`;