const express = require("express");
const path = require("path");
require("dotenv").config();
const app=require("./src/app");
const { sequelize } = require("./src/models");

sequelize.sync().then(()=>{ 
    console.log("Database synced...");
})

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
});
