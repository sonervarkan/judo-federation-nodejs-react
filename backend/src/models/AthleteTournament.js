const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AthleteTournament = sequelize.define("AthleteTournament", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    athleteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rank: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    weightCategory: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = AthleteTournament;
