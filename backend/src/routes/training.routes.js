const verifyToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const trainingController = require("../controllers/training.controller");
const router = require("express").Router();

router.get("/training-list", verifyToken, roleMiddleware(["Admin", "Coach"]), trainingController.listTrainings);
router.post("/register-training", verifyToken, roleMiddleware(["Admin", "Coach"]), trainingController.addTraining);
router.put("/edit-training/:id", verifyToken, roleMiddleware(["Admin", "Coach"]), trainingController.editTraining);
router.delete("/delete-training/:id", verifyToken, roleMiddleware(["Admin", "Coach"]), trainingController.deleteTraining);

router.put("/update-athlete-training/:id", verifyToken, roleMiddleware(["Coach"]), trainingController.updateAthleteTraining);

module.exports = router;