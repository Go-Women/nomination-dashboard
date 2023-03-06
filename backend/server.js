const express = require("express");
const codes = require("./app/models/codes.ts");
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

app.get('/keys', (req, res) => {
  res.json((codes));
});

require("./app/routes/nominations.routes.js")(app);
require("./app/routes/nominees.routes.js")(app);
require("./app/routes/judges.routes.js")(app);
require("./app/routes/nominees.routes.js")(app);
require("./app/routes/matches.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});