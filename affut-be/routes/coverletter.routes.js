module.exports = app => {
  const coverLetter = require("../controllers/coverletter.controller")
  const router = require("express").Router();

  router.get("/init/:userId", coverLetter.initialize)
  router.get("/:userId", coverLetter.getByUserId)
  router.post('/generateLetter/:userId', coverLetter.generateLetter)

  app.use('/api/coverletter', router);
}