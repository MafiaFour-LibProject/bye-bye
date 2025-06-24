import { apiClient } from "./config"


export const ApiLogin = async(payload) => apiClient.post("/api/auth/logIn", payload);

export const ApiSignUp = async(payload) => apiClient.post("/api/auth/signUp", payload);

