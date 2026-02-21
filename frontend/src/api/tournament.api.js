import api from "./axios";

export const listTournamentApi = async () => {
  const response = await api.get("/api/tournament/tournament-list");
  return response.data;
};

export const registerTournamentApi = async (data) => {
  const response = await api.post("/api/tournament/register-tournament", data);
  return response.data;
};

export const editTournamentApi = async (id, data) => {
  const response = await api.put(`/api/tournament/edit-tournament/${id}`, data);
  return response.data;
};

export const deleteTournamentApi = async (id) => {
  const response = await api.delete(`/api/tournament/delete-tournament/${id}`);
  return response.data;
};

export const addAthleteToTournamentApi = async (data) => {
  const response = await api.post("/api/tournament/add-athlete", data);
  return response.data;
};

export const updateAthleteRankApi = async (data) => {
  const response = await api.put("/api/tournament/update-rank", data);
  return response.data;
};

