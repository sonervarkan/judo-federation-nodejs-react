const { User, Athlete, Coach, Training, Tournament } = require("../models");
const bcrypt = require("bcryptjs");


const getAthleteProfile = async (userId) => {
  try {
    const athlete = await Athlete.findOne({
      where: { userId },

      include: [
        {
          model: User,
          attributes: ["name", "email"]
        },

        {
          model: Coach,
          attributes: ["id"],
          include: [
            {
              model: User,
              attributes: ["name"]
            }
          ]
        },
        {
          model: Training
        }, 
        {
            model: Tournament,
            attributes: ["id", "name", "location", "startDate", "endDate"],
            through: {
                attributes: ["rank", "weightCategory"]
            }
        }
      ]
    });

    if (!athlete) throw new Error("Athlete profile not found");

    return athlete;

  } catch (error) {
    console.error("GET ATHLETE PROFILE ERROR:", error);
    throw error;
  }
};

const listAthletes = async () => {
    try {
        return await Athlete.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name", "email"]
                },
                {
                    model: Coach,
                    attributes: ["id"],
                    include: [{ model: User, attributes: ["name"] }]
                }
            ],
            order: [["id", "ASC"]]
        });
    } catch (error) {
        console.error("LIST ATHLETE SERVICE ERROR:", error);
        throw error;
    }
};

const registerAthlete = async (data) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: "Athlete"
        });

        const newAthlete = await Athlete.create({
            userId: newUser.id,
            weight: data.weight,
            belt: data.belt,
            club: data.club,
            licenseNumber: data.licenseNumber,
            coachId: (data.coachId === "" || !data.coachId) ? null : data.coachId
        });

        return { newUser, newAthlete };
    } catch (error) {
        console.error("REGISTER ATHLETE SERVICE ERROR:", error);
        throw error;
    }
};

const editAthlete = async (athleteId, data) => {
    try {
        const athlete = await Athlete.findByPk(athleteId, { include: [User] });
        if (!athlete) throw new Error("Athlete not found");

        if (data.password && data.password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await athlete.User.update({ password: hashedPassword });
        }

        await athlete.User.update({
            name: data.name || athlete.User.name,
            email: data.email || athlete.User.email
        });

        await athlete.update({
            weight: data.weight,
            belt: data.belt,
            club: data.club,
            licenseNumber: data.licenseNumber,
            coachId: (data.coachId === "" || !data.coachId) ? null : data.coachId
        });

        return { message: "Update successful." };
    } catch (error) {
        console.error("EDIT ATHLETE SERVICE ERROR:", error);
        throw error;
    }
};

const deleteAthlete = async (athleteId) => {
    try {
        const athlete = await Athlete.findByPk(athleteId);
        if (!athlete) throw new Error("No athlete found..");

        const userId = athlete.userId;
        await athlete.destroy(); 
        await User.destroy({ where: { id: userId } }); 

        return { message: "The athlete and user registration has been successfully deleted." };
    } catch (error) {
        console.error("DELETE ATHLETE SERVICE ERROR:", error);
        throw error;
    }
};

module.exports = { 
    getAthleteProfile, 
    listAthletes, 
    registerAthlete, 
    editAthlete, 
    deleteAthlete, 
    getAthleteProfile
};