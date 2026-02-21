import api from "./axios";

export const listCoachesApi = async () => {
    const response = await api.get("/api/coach/coach-list");
    return response.data;
};

export const registerCoachApi = async (coachData) => {
    const response = await api.post("/api/coach/register-coach", coachData);
    return response.data;
};


export const editCoachApi = async (coachId, data) => {
    const response = await api.put(`/api/coach/edit-coach/${coachId}`, data);
    return response.data;
};

export const deleteCoachApi= async (coachId) => {
    const response=await api.delete(`/api/coach/delete-coach/${coachId}`);
    return response.data;
};

export const getCoachProfile = async () => {
    const response = await api.get("/api/coach/profile");
    return response.data;
};