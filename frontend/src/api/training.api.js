import api from "./axios";

export const listTrainingsApi = async () => {
    const response = await api.get("/api/training/training-list");
    return response.data;
};

export const addTrainingApi = async (trainingData) => {
    const response = await api.post("/api/training/register-training", trainingData);
    return response.data;
};

export const editTrainingApi = async (trainingId, trainingData) => {
    const response = await api.put(`/api/training/edit-training/${trainingId}`, trainingData);
    return response.data;
};

export const deleteTrainingApi = async (trainingId) => {
    const response = await api.delete(`/api/training/delete-training/${trainingId}`);
    return response.data;
};
