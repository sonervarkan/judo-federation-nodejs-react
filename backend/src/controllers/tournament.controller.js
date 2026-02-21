const tournamentService = require("../services/tournament.service");

const addTournament = async (req, res) => {
  try {
    const tournament = await tournamentService.addTournament(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const listTournament = async (req, res) => {
  try {
    const tournaments = await tournamentService.listTournament();
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editTournament = async (req, res) => {
  try {
    const tournament = await tournamentService.editTournament(req.params.id, req.body);
    res.json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTournament = async (req, res) => {
  try {
    await tournamentService.deleteTournament(req.params.id);
    res.json({ message: "Tournament deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addAthleteToTournament = async (req, res) => {
  try {
    const result = await tournamentService.addAthleteToTournament(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAthleteRank = async (req, res) => {
  try {
    const result = await tournamentService.updateAthleteRank(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { addTournament, listTournament, editTournament, deleteTournament, 
addAthleteToTournament, updateAthleteRank};
