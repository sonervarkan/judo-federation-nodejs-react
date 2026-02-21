const authService = require("../services/auth.service");

const login = async (req, res)=>{
    try{
        const {token, user}=await authService.login(req.body.email, req.body.password);

        res.status(200).json({token, user});
    }catch(error){
        res.status(401).json({message:"Server error: Login failed"});
    }
}

module.exports={login};