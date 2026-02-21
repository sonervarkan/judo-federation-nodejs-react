const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const AthleteTraining = sequelize.define("AthleteTraining", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        athleteId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        trainingId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        attendance: {
            type: DataTypes.ENUM("Pending", "Present", "Absent", "Excused"),
            defaultValue: "Pending" 
        },
        performanceScore: {
            type: DataTypes.INTEGER,
            validate: { min: 1, max: 10 }
        },
        coachNotes: DataTypes.TEXT, 

    }, 
    {
        timestamps: true
    }
);

module.exports=AthleteTraining