import api from "./axios";

export const updateAthleteTrainingApi = async (id, data) => {
    const response = await api.put(`/api/training/update-athlete-training/${id}`, data);
    return response.data;
};