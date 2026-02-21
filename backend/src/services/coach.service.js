const { User, Coach, Athlete } = require("../models");
const bcrypt = require("bcryptjs");

const listCoaches = async () => {
  try {
    return await Coach.findAll({
      include: [{
        model: User,
        attributes: ["name", "email"]
      }],
      order: [["id", "ASC"]]
    });
  } catch (error) {
    console.error("LIST COACH SERVICE ERROR:", error);
    throw error;
  }
};

const registerCoach = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "Coach"
    });

    const newCoach = await Coach.create({
      userId: newUser.id,
      specialization: data.specialization,
      danLevel: data.danLevel
    });

    return { newUser, newCoach };
  } catch (error) {
    console.error("REGISTER COACH SERVICE ERROR:", error);
    throw error;
  }
};

const editCoach = async (coachId, data) => {
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) throw new Error("Coach not found");

    await User.update(
      {
        name: data.name,
        email: data.email
      },
      { where: { id: coach.userId } }
    );

    await coach.update({
      specialization: data.specialization,
      danLevel: data.danLevel
    });

    return { message: "Update successful." };
  } catch (error) {
    console.error("EDIT COACH SERVICE ERROR:", error);
    throw error;
  }
};

const deleteCoach = async (coachId) => {
  try {
    const coach = await Coach.findByPk(coachId);
    if (!coach) throw new Error("Coach not found");

    const userId = coach.userId;

    await coach.destroy();
    await User.destroy({ where: { id: userId } });

    return { message: "Delete successful." };
  } catch (error) {
    console.error("DELETE COACH SERVICE ERROR:", error);
    throw error;
  }
};


const getCoachProfile = async (userId) => {
  try {
    const coach = await Coach.findOne({
      where: { userId },

      attributes: ["id", "specialization", "danLevel"],

      include: [
        {
          model: User,
          attributes: ["name", "email"]
        },
        {
          model: Athlete,
          required: false,
          attributes: ["id", "belt", "weight", "licenseNumber"],
          include: [
            {
              model: User,
              attributes: ["name", "email"]
            }
          ]
        }
      ]
    });

    if (!coach) throw new Error("Coach profile not found");

    return coach;
  } catch (error) {
    console.error("GET COACH PROFILE ERROR:", error);
    throw error;
  }
};

module.exports = {
  listCoaches,
  registerCoach,
  editCoach,
  deleteCoach,
  getCoachProfile
};