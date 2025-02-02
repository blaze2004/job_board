import axios from "axios";

const axiosIns = axios.create({
  baseURL: "http://localhost:5000",
});

axiosIns.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosIns;
