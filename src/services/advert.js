import { apiClient } from "./config";

//get all adverts
export const apiFetchAdverts = async() = apiClient.get("/adverts/");

export const apIGetSingleAdvert = async (id) => apiClient.get(`/adverts/${id}`);


//update an advert
export const apiUpdateAdvert =async(id, payload) =>apiClient.put (`/adverts/${id}`, payload);

//delete an advert
export const apiDeleteAdvert =async (id) => apiClient.delete (`/adverts/${id}`);

//add a new advert
export const apiCreatedAd = async(payload) => apiClient.post(`/adverts/`, payload);

