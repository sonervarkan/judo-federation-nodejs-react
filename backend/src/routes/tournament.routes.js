const verifyToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const tournamentController=require("../controllers/tournament.controller");
const router=require("express").Router();

router.get("/tournament-list", verifyToken, roleMiddleware(["Admin", "Coach"]), tournamentController.listTournament);
router.post("/register-tournament", verifyToken, tournamentController.addTournament);
router.put("/edit-tournament/:id", verifyToken, roleMiddleware("Admin"), tournamentController.editTournament);
router.delete("/delete-tournament/:id", verifyToken, roleMiddleware("Admin"), tournamentController.deleteTournament);

router.post("/add-athlete", verifyToken, roleMiddleware("Admin"), tournamentController.addAthleteToTournament);
router.put("/update-rank", verifyToken, roleMiddleware("Admin"), tournamentController.updateAthleteRank);


module.exports=router;