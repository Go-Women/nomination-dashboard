const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// parse requests of content-type - application/json
// app.use(express.json());
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hall!" });
});

require("./app/routes/nominations.routes.js")(app);
require("./app/routes/judges.routes.js")(app);
// require("./app/routes/nominees.routes.js")(app);

// const nominees = require("./app/src/dummyNomineeDB.ts");
// app.use(express.json());
// app.get('/nominees/:id', (req, res) => {
//   let id = req.params['id'];
//   res.json((nominees)[id]);
// });

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});