const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Training = sequelize.define("Training", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  coachId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  name: DataTypes.STRING,

  type: {
    type: DataTypes.ENUM("Technical", "Randori", "Conditioning", "Competition Prep"),
    defaultValue: "Technical"
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  startTime: DataTypes.TIME,
  endTime: DataTypes.TIME,

  notes: DataTypes.TEXT
});

module.exports = Training;
