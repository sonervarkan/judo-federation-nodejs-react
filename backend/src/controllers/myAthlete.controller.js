const service = require("../services/myAthlete.service");


const myAthlete=async(req,res)=>{
    try{
        const {id}=req.params;
        const athlete= await service.myAthlete(id);
        res.json(athlete);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports={myAthlete};