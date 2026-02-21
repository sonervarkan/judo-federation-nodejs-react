const coachController = require("../controllers/coach.controller");
const verifyToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const router=require("express").Router();


router.get("/coach-list", verifyToken, roleMiddleware("Admin"), coachController.listCoaches);
router.post("/register-coach", verifyToken, roleMiddleware("Admin"), coachController.registerCoach);
router.put("/edit-coach/:id", verifyToken, roleMiddleware("Admin"), coachController.editCoach);
router.delete("/delete-coach/:id", verifyToken, roleMiddleware("Admin"), coachController.deleteCoach);
router.get("/profile", verifyToken, coachController.getCoachProfile);


module.exports = router;