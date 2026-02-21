const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("Admin", "Coach", "Athlete"),
            allowNull: false,
            defaultValue: "Athlete"
        }
    }, 
    {
        timestamps: true
    }
);

module.exports=User