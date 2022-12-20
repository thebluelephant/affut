module.exports = app => {
  const followup = require("../controllers/followup.controller");

  var router = require("express").Router();

  // Create a new followup 
  router.post("/new", followup.create);

  // Update a followup 
  router.put("/update/:id", followup.update);

  // Retrieve a single followup with id
  router.get("/getByUserId/:userId", followup.findAllByUserId);

  // Delete a single followup with its ID 
  router.delete("/delete/:id", followup.delete);

  router.post("/deletemultiple", followup.deleteMultipleByIds);

  app.use('/api/followup', router);
}