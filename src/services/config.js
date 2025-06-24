import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
});

//intercept request to attach token
apiClient.interceptors.request.use(
  (config) => {
    //retrieve the
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
