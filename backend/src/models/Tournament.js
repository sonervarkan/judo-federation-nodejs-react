const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");

const Tournament = sequelize.define("Tournament", {
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
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfterStart(value) {
                    if (value < this.startDate) {
                        throw new Error("The end date cannot be before the start date.");
                    }
                }
            }
        }
    }, 
    {
        timestamps: true
    }
)

module.exports=Tournament