module.exports = app => {
  const nominations = require("../controllers/nominations.controller.js");

  var router = require("express").Router();

  // Create a new Nomination
  router.post("/", nominations.create);

  // Retrieve all Nominations
  router.get("/", nominations.findAll);

  // Retrieve a single Nomination with id
  router.get("/:id", nominations.findOne);

  // Update a Nomination with id
  router.put("/:id", nominations.update);

  // Review a Nomination (Accept/Reject/Merge)
  router.post("/review", nominations.review);

  app.use('/nominations', router);
};
