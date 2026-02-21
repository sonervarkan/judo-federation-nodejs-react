const express=require("express");
const app=express();
const cors=require("cors");

app.use(cors());
app.use(express.json());



app.use("/api/auth",require("./routes/auth.routes"));

app.use("/api/coach",require("./routes/coach.routes"));

app.use("/api/athlete",require("./routes/athlete.routes"));

app.use("/api/tournament",require("./routes/tournament.routes"));

app.use("/api/training",require("./routes/training.routes"));

app.use("/api/myAthlete",require("./routes/myAthlete.routes"));


module.exports=app;