const athleteService = require("../services/athlete.service");

const listAthletes = async (req, res) => {
    try {
        const athletes = await athleteService.listAthletes();
        res.status(200).json(athletes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerAthlete=async(req,res)=>{
    try{
        if (!req.body.email||!req.body.password){
            return res.status(400).json({message:"Email and password are necessary."});
        }
        const {newUser, newAthlete}=await athleteService.registerAthlete(req.body);

        newUser.password=undefined; // password görünmesini istiyoruz

        res.status(201).json({
            message: "Athlete was added succesfully",
            data:{user:newUser, athlete:newAthlete}
        });
    }catch (error) {
        console.error("REGISTER ATHLETE CONTROLLER ERROR:", error);
        res.status(500).json({
            message: "Server error: Athlete couldn't be added"
        });
    }
    
}

const editAthlete = async (req, res) => {
    try {
        const targetId = req.params.id || req.user.userId;

        const athlete = await athleteService.editAthlete(targetId, req.body);
        res.status(200).json({ message: "Update is successful", athlete });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteAthlete = async (req, res) => {
    try {
        const targetId = req.params.id;
        const deletedData = await athleteService.deleteAthlete(targetId);
        res.status(200).json({ message: "Delete is successful", deletedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getAthleteProfile = async (req, res) => {
    try {
              
        const userId = req.user.userId; 

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized user" });
        }

        const athlete = await athleteService.getAthleteProfile(userId);
        
        if (!athlete) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(athlete);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    listAthletes, 
    registerAthlete, 
    editAthlete, 
    deleteAthlete, 
    getAthleteProfile
};