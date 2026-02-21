const coachService = require("../services/coach.service");

const listCoaches = async (req, res) => {
    try {
        const coaches = await coachService.listCoaches();
        res.status(200).json(coaches);
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
};

const registerCoach = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {    
            return res.status(400).json({ message: "Email and password are necessary." });
        }

        const { newCoach, newUser } = await coachService.registerCoach(req.body);

        newUser.password = undefined; 

        res.status(201).json({
            message: "Coach was added succesfully",
            data: {coach: newCoach, user: newUser}
        });
    } catch (error) {
        
        res.status(500).json({ 
            message: "Server error: Coach couldn't added",
            error: error.message 
        });
    }
};


const editCoach = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: "No Coach ID to update has been specified." });
        }

        const updatedData = await coachService.editCoach(id, req.body);
        
        res.status(200).json({ 
            message: "Update is successful", 
            data: updatedData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteCoach = async (req, res) => {
    try {
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: "No Coach ID to be deleted has been specified." });
        }

        const deletedData = await coachService.deleteCoach(id);
        
        res.status(200).json({ 
            message: "Delete is successful", 
            data: deletedData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCoachProfile = async (req, res) => {
  try {
    const coach = await coachService.getCoachProfile(req.user.userId);
    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  listCoaches, 
  registerCoach, 
  editCoach, 
  deleteCoach, 
  getCoachProfile 
};
