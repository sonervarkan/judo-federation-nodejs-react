const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Athlete = sequelize.define("Athlete", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    weight: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    belt: {
        type: DataTypes.ENUM("White", "Yellow", "Orange", "Green", "Blue", "Purple", "Brown", "Black"),
        allowNull: false
    },
    club: {
        type: DataTypes.STRING,
        allowNull: false
    },
    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    coachId: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        onDelete: 'SET NULL' 
    }
}, {
    timestamps: true,
    tableName: 'athletes' 
});

module.exports = Athlete;