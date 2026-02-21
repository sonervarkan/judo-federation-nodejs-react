const athleteController= require("../controllers/athlete.controller");
const verifyToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router = require("express").Router();


router.get("/athlete-list", verifyToken, roleMiddleware("Admin"), athleteController.listAthletes);
router.post("/register-athlete", verifyToken, roleMiddleware("Admin"), athleteController.registerAthlete);
router.put("/edit-athlete/:id", verifyToken, roleMiddleware("Admin"), athleteController.editAthlete);
router.delete("/delete-athlete/:id", verifyToken, roleMiddleware("Admin"), athleteController.deleteAthlete);
router.get("/profile", verifyToken, athleteController.getAthleteProfile);



module.exports = router;