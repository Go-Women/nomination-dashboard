module.exports = app => {
  // contains all the routes for Judges page
  const judges = require("../controllers/judges.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", judges.create);

  // Retrieve all Users
  router.get("/", judges.findAll);

  // Retrieve a single User with id
  router.get("/:id", judges.findOne);

  // Update a User with id
  router.put("/:id", judges.update);

  // for now this is used will update to hide this based on user authentication
  app.use('/judges', router);
};
