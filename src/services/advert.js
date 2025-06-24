import { apiClient } from "./config";

//get all adverts
export const apiFetchAdverts = async() = apiClient.get("/api/adverts/");

export const apIGetSingleAdvert = async (id) => apiClient.get(`/api/adverts/${"id"}`);


//update an advert
export const apiUpdateAdvert =async(id, payload) =>apiClient.put (`/api/adverts/${id}`, payload);

//delete an advert
export const apiDeleteAdvert =async (id) => apiClient.delete (`/api/adverts/${id}`);

//add a new advert
export const apiCreatedAd = async(payload) => apiClient.get(`/api/adverts/${id}`);

