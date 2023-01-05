module.exports = app => {
  const jobs = require("../controllers/jobs.controller");
  var router = require("express").Router();
  
  // Get jobs
  router.get("/getJobsBy", jobs.getAll);

  app.use('/api/jobs', router);
}