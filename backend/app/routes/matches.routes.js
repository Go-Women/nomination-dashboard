module.exports = app => {
    // contains all the routes for Matches page
    const matches = require("../controllers/matches.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Matches
    router.get("/", matches.findAll);

    // Create a new Match
    router.post("/", matches.create);

    // get all judges that can be matched
    router.get("/judges", matches.findAllJudges);

    // get all nominees that can be matched
    router.get("/nominees", matches.findAllNominees);

    // get all suggested matches that need to be reviewed
    router.get("/review", matches.findMatchesReview);

    // get matches that need to be manually reviewed
    router.get("/manual", matches.findManual);

    // update status of nominee to be put into manual review
    router.patch("/manual", matches.updateNomineeStatus);
  
    // Update a Match with id
    // router.patch("/", matches.findAll);

    // Retrieve a single Match with id
    router.get("/:id", matches.findOne);

    // Update a Match with id
    // router.patch("/:id", matches.update);
  
    // this based on user authentication eventually
    app.use('/matches', router);
  };