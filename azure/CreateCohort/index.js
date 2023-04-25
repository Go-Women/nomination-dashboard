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
        // Create a Cohort
		const cohort = new Cohort({
	    	startDate: req.body.startDate || new Date(),
	   	});
		 
		// end pervious cohort
        await db.query(sqlQuery1, newCohort.startDate);
        context.res = {
            status: 200,
            body: "OK",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // save cohort in database   
        await db.query("INSERT INTO Cohort SET ?", cohort);
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

const sqlQuery1 = `
UPDATE 
	Cohort 
SET 
	endDate = ? 
WHERE 
	id = (SELECT id FROM ( SELECT id FROM Cohort ORDER BY id DESC LIMIT 1) AS t)
`;
