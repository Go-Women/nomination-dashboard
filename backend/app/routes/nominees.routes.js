module.exports = app => {
  // contains all the routes for Nominees page
  const nominees = require("../controllers/nominees.controller.js");
  const nominations = require("../controllers/nominations.controller.js");

  var router = require("express").Router();

  // Create a new Nominee
  router.post("/", nominees.create);

  // Retrieve all Nominees
  router.get("/", nominees.findAll);

  // Retrieve a single Nominee with id
  router.get("/:id", nominees.findOne);

  // Update a Nominee with id
  router.patch("/:id", nominees.update);

  // Update an afilliated Nomination
  router.post("/:id", nominations.update);

  // this based on user authentication eventually
  app.use('/nominees', router);

};
