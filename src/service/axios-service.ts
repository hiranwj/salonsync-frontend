import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: "http://localhost:8080/" ,
//   timeout: 180000,
//   headers: {
//   },
// });

const axiosInstance = axios.create({
  headers: { "Content-Type": "application/json" },
});

// Optional: add token automatically for secured endpoints
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
