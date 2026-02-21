const sequelize=require("../config/database");
const User=require("./User");
const Coach=require("./Coach");
const Athlete=require("./Athlete");
const Tournament=require("./Tournament");
const Training=require("./Training");
const AthleteTournament=require("./AthleteTournament");
const AthleteTraining=require("./AthleteTraining");


// 1. User - Athlete
User.hasOne(Athlete, { foreignKey: "userId", onDelete: "CASCADE" });
Athlete.belongsTo(User, { foreignKey: "userId" });

// 2. User - Coach 
User.hasOne(Coach, {foreignKey:"userId", onDelete: "CASCADE"});
Coach.belongsTo(User, {foreignKey:"userId"});   

// 3. Coach - Athlete 
Coach.hasMany(Athlete, { foreignKey: "coachId", onDelete: "CASCADE" });
Athlete.belongsTo(Coach, { foreignKey: "coachId" });

// 4. Training - Coach 
Coach.hasMany(Training, { foreignKey: "coachId", onDelete: "CASCADE"  });
Training.belongsTo(Coach, { foreignKey: "coachId" });

// 5. Athlete - Training 
Athlete.belongsToMany(Training, { through: AthleteTraining, foreignKey: "athleteId", onDelete: "CASCADE"});
Training.belongsToMany(Athlete, { through: AthleteTraining, foreignKey: "trainingId", onDelete: "CASCADE"});

// 6. Athlete - Tournament
Athlete.belongsToMany(Tournament, { through: AthleteTournament, foreignKey: 'athleteId' });
Tournament.belongsToMany(Athlete, { through: AthleteTournament, foreignKey: 'tournamentId' });


module.exports = {
    sequelize, 
    User,
    Athlete,
    Coach,
    Tournament,
    Training,
    AthleteTournament,
    AthleteTraining
};