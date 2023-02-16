module.exports = app => {
  // contains all the routes for a given user
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all Users
  router.get("/", users.findAll);

  // Retrieve a single User with id
  router.get("/:id", users.findOne);

  // Update a User with id
  router.put("/:id", users.update);

  // for now this is used will update to hide this based on user authentication
  app.use('/user', router);
};
