module.exports = app => {
    // contains all the routes for Matches page
    const matches = require("../controllers/matches.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Match
    // router.post("/", matches.create);
  
    // Retrieve all Matches
    router.get("/", matches.findAll);

    // create matches
    router.post("/data", matches.findAllMatches);
  
    // Update a Match with id
    router.patch("/", matches.generate);

    // Retrieve a single Match with id
    router.get("/:id", matches.findOne);

    // Update a Match with id
    router.patch("/:id", matches.update);
  
    // this based on user authentication eventually
    app.use('/matches', router);
  };