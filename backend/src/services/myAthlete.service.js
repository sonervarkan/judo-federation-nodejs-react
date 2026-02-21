const { User, Athlete, Training, Tournament } = require("../models");

const myAthlete = async (athleteId) => {
  return await Athlete.findByPk(athleteId, {
    attributes: ["id", "weight", "belt", "club", "licenseNumber", "coachId"],

    include: [
      {
        model: User,
        attributes: ["name", "email"]
      },
      
      {
        model: Training,
        attributes: ["id", "name", "date", "type"],

        through: {
          attributes: ["id", "attendance", "performanceScore", "coachNotes"]
        }
      },
       {
        model: Tournament,
        attributes: ["id", "name", "location", "startDate"],
        through: {
          attributes: ["rank", "weightCategory"]
        }
      }
    ]
  });
};

module.exports = { myAthlete };