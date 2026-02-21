const trainingService = require("../services/training.service");

const listTrainings = async (req, res) => {
  try {
    const trainings = await trainingService.listTrainings();
    res.json(trainings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "List error" });
  }
};

const addTraining = async (req, res) => {
  try {
    const training = await trainingService.addTraining(req.body);
    res.status(201).json(training);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Create error" });
  }
};

const editTraining = async (req, res) => {
  try {
    await trainingService.editTraining(req.params.id, req.body);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Edit error" });
  }
};

const deleteTraining = async (req, res) => {
  try {
    await trainingService.deleteTraining(req.params.id);
    res.json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Delete error" });
  }
};

const updateAthleteTraining = async (req, res) => {
    try {
        const updated = await trainingService.updateAthleteTraining(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update AthleteTraining error" });
    }
};

module.exports = {
  listTrainings,
  addTraining,
  editTraining,
  deleteTraining,
  updateAthleteTraining
};