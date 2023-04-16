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
      const matches = [];
      const accepted = `${req.body['accept']}`;

      // Create Matches
      for (const nom of accepted) {
        matches.push([parseInt(nom[0]), parseInt(nom[1]), "m300"]);
      }

      await db.query("INSERT INTO Matches (nomineeID, judgeID, matchStatus) VALUES ?", [matches]);

      for (const match of matches) {
          await db.query(sqlQuery1, [
              match[0],
              match[1]
          ]);
          await db.query(sqlQuery2, match[1]);
      }

      const manualReview = [];
      for (const nom of `${req.body.manual}`) {
        manualReview.push([parseInt(nom[0]), nom[1]]);
      }

      for (const nom of manualReview) {
        await db.query("UPDATE Nominees SET nomStatus = ? WHERE ID = ?", [
          nom[1],
          nom[0]
        ]);
      }
      
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
Nominees, 
Users 
SET 
Nominees.nomStatus = IF(
  (Nominees.matchesAssigned + 1) = 3, 
  'm300', 
  'n200'
), 
Users.info = IF(
  (
    JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1
  ) = JSON_EXTRACT(Users.info, '$.judgeCapacity'), 
  JSON_SET(
    Users.info, '$.judgeStatus', 'm300'
  ), 
  JSON_SET(
    Users.info, '$.judgeStatus', 'j300'
  )
), 
Nominees.matchesAssigned = Nominees.matchesAssigned + 1, 
Users.info = JSON_SET(
  Users.info, 
  '$.matchesAssigned', 
  JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1
) 
WHERE 
Nominees.ID = ? 
AND Users.ID = ?
`;

const sqlQuery2 = `
UPDATE 
Users 
SET 
info = IF(
  (
    JSON_EXTRACT(Users.info, '$.matchesAssigned') + 1
  ) = JSON_EXTRACT(Users.info, '$.judgeCapacity'), 
  JSON_SET(
    Users.info, '$.judgeStatus', 'm300'
  ), 
  JSON_SET(
    Users.info, '$.judgeStatus', 'j300'
  )
) 
WHERE 
ID = ?
`;
