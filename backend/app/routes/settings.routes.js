module.exports = app => {
    // contains all the routes for Nominees page
    const settings = require("../controllers/settings.controller.js");

    var router = require("express").Router();

    // Create a new Cohort
    router.post("/", settings.createCohort);

    // Retrieve all Cohorts
    router.get("/", settings.findAllCohorts);

    // this based on user authentication eventually
    app.use('/settings', router);
};
  