const { Tournament, AthleteTournament, Athlete, User } = require("../models");

const addTournament = async (data) => {
  return await Tournament.create(data);
};

const listTournament = async () => {
  return await Tournament.findAll({ order: [["startDate", "DESC"]] });
};

const editTournament = async (id, data) => {
  const tournament = await Tournament.findByPk(id);
  if (!tournament) throw new Error("Tournament not found");

  return await tournament.update(data);
};

const deleteTournament = async (id) => {
  const tournament = await Tournament.findByPk(id);
  if (!tournament) throw new Error("Tournament not found");

  await tournament.destroy();
};

const addAthleteToTournament = async (data) => {

  const { tournamentId, weightCategory, rank } = data;
  const email = data.email.trim();

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("No user was found with this email address.");

  const athlete = await Athlete.findOne({
    where: { userId: user.id }
  });

  if (!athlete) throw new Error("There are no athlete associated with this user.");

  const exists = await AthleteTournament.findOne({ where: {athleteId: athlete.id, tournamentId}});
  if (exists) throw new Error("Athlete is already registered for this tournament.");

  return await AthleteTournament.create({athleteId: athlete.id, tournamentId, weightCategory, rank});
};

const updateAthleteRank = async ({ tournamentId, email, rank }) => {

  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const athlete = await Athlete.findOne({ where: { userId: user.id } });
  if (!athlete) throw new Error("Athlete not found");

  const record = await AthleteTournament.findOne({
    where: { athleteId: athlete.id, tournamentId }
  });

  if (!record) throw new Error("Athlete is not registered for this tournament.");

  await record.update({ rank });

  return record;
};

module.exports = { addTournament, listTournament, editTournament, deleteTournament, 
addAthleteToTournament, updateAthleteRank };
