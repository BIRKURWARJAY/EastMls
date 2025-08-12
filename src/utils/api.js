import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true
});

api.interceptors.request.use(
  config => {
    return config;
  },

  error => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  async res => {
    if (res && res.status === 420) {
      try {
        const tokenRes = await api.get("/auth/refresh-token", {
          withCredentials: true
        });
        if (tokenRes.status === 200) {
          return api.request(res.config);
        }
      } catch (refreshError) {
        console.log("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
  },

  async (error) => {

    return Promise.reject(error);
  }
);
