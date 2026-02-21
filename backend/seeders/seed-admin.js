require("dotenv").config();
const bcrypt = require("bcryptjs");
const {sequelize, User} = require("../src/models");

const seedAdmin=async()=>{
    try{
        await sequelize.authenticate();

        const existingAdmin=await User.findOne({where:{role:"Admin"}});

        if(existingAdmin){
            console.log("Admin already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

        await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "Admin"
        });

        
        console.log("Admin created successfully");
        process.exit();
    }catch(error){
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();