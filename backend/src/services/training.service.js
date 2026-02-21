const { Training, Coach, AthleteTraining, Athlete, User } = require("../models");
const sequelize = require("../config/database");

const listTrainings = async () => {
  return await Training.findAll({
    include: [
      {
        model: Coach,
        include: [{ model: User, attributes: ["name", "email"] }]
      },
      {
        model: Athlete,
        attributes: ["id", "belt", "weight", "licenseNumber"],
        through: {
          attributes: ["id", "attendance", "performanceScore", "coachNotes"]
        },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"]
          }
        ]
      }
    ],
    order: [["date", "DESC"]]
  });
};


const addTraining = async (data) => {
  const transaction = await sequelize.transaction();

  try {
    const { athleteIds, ...trainingData } = data;

    const training = await Training.create(trainingData, { transaction });

    if (athleteIds?.length) {
      const rows = athleteIds.map(id => ({
        athleteId: parseInt(id),
        trainingId: training.id,
        attendance: "Pending",
        performanceScore: null,
        coachNotes: ""
      }));

      await AthleteTraining.bulkCreate(rows, { transaction });
    }

    await transaction.commit();
    return training;

  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};


const editTraining = async (id, data) => {
  const transaction = await sequelize.transaction();

  try {
    const { athleteIds, ...trainingData } = data;

    await Training.update(trainingData, {
      where: { id },
      transaction
    });

    if (athleteIds) {
  
      await AthleteTraining.destroy({
        where: { trainingId: id },
        transaction
      });

     
      const rows = athleteIds.map(aid => ({
        athleteId: parseInt(aid),
        trainingId: id,
        attendance: "Pending"
      }));

      await AthleteTraining.bulkCreate(rows, { transaction });
    }

    await transaction.commit();
    return { message: "Training updated" };

  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};


const deleteTraining = async (id) => {
  const transaction = await sequelize.transaction();

  try {
   
    await AthleteTraining.destroy({
      where: { trainingId: id },
      transaction
    });

   
    await Training.destroy({
      where: { id },
      transaction
    });

    await transaction.commit();

    return { message: "Training deleted" };

  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};


const updateAthleteTraining = async (athleteTrainingId, data) => {
    const { attendance, performanceScore, coachNotes } = data;
    const record = await AthleteTraining.findByPk(athleteTrainingId);
    if (!record) throw new Error("AthleteTraining not found");

    await record.update({ attendance, performanceScore, coachNotes });
    return record;
};

module.exports = {
  listTrainings,
  addTraining,
  editTraining,
  deleteTraining,
  updateAthleteTraining
};