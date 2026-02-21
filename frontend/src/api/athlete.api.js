import api from "./axios";

export const listAthletesApi = async () => {
    const response = await api.get("/api/athlete/athlete-list");
    return response.data;
}

export const registerAthleteApi= async (athleteData)=>{
    const response=await api.post("/api/athlete/register-athlete", athleteData);
    return response.data;
};

export const editAthleteApi = async (athleteId, data) => {
    const response = await api.put(`/api/athlete/edit-athlete/${athleteId}`, data);
    return response.data;
}

export const deleteAthleteApi = async (athleteId) => {
    const response = await api.delete(`/api/athlete/delete-athlete/${athleteId}`);
    return response.data;
}


export const getAthleteProfile = async () => {
    const response = await api.get("/api/athlete/profile");
    return response.data;
};

