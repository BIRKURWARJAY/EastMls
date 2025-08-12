import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true
});

api.interceptors.response.use(
  undefined,

  async (error) => {
    if (error.response && error.response.status === 420) {
      try {
        const tokenRes = await api.get("/auth/refresh-token", {
          withCredentials: true
        });
        if (tokenRes.status === 200) {
          return api.request(error.config);
        }
      } catch (refreshError) {
        console.log("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
