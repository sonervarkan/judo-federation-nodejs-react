const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Coach = sequelize.define("Coach", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false
    },
    danLevel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {                 
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "coaches"
});

module.exports = Coach;
