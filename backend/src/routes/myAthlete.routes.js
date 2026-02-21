const myAthleteController = require("../controllers/myAthlete.controller");
const verifyToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = require("express").Router();

router.get("/my-Athlete/:id", verifyToken, roleMiddleware(["Coach", "Athlete"]), myAthleteController.myAthlete);

module.exports = router;