const express = require("express");
const router = express.Router();
const activitiesController = require("../controllers/activities.controller");
const suggestionsController = require("../controllers/activitysuggestions.controller");
const authController = require("../controllers/auth.controller");

router.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    // finish event is emitted once the response is sent to the client
    const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
    console.log(
      `${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`
    );
  });
  next();
});
router.route("/").get(activitiesController.findAll);
router.route("/:activityID").get(activitiesController.findOne);
router.route("/:activityID/users/:userID").put(activitiesController.subscribe);

router
  .route("/participation/:activityID/users/:userID")
  .put(authController.verifyToken, activitiesController.verifyParticipation);

router
  .route("/suggestion")
  .post(authController.verifyToken, suggestionsController.findAll);

module.exports = router;
