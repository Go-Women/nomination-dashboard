module.exports = app => {
    // contains all the routes for Matches page
    const matches = require("../controllers/matches.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Match
    router.post("/", matches.create);
  
    // Retrieve all Matches
    router.get("/", matches.findAll);
  
    // Retrieve a single Match with id
    router.get("/:id", matches.findOne);
  
    // Update a Match with id
    router.put("/:id", matches.update);
  
    // this based on user authentication eventually
    app.use('/matches', router);
  };