import api from "./axios";

export const myAthleteApi = async (id) => {
    const response = await api.get(`/api/myAthlete/my-Athlete/${id}`);
    return response.data;
};
