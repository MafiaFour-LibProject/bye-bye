import { apiClient } from "./config";

export const ApiLogin = async (payload) =>
  apiClient.post("/auth/logIn", payload);

export const ApiSignUp = async (payload) =>
  apiClient.post("/auth/signUp", payload);
