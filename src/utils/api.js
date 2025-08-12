import axios from "axios";


export const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  withCredentials: true
});


api.interceptors.response.use(
  undefined,

  async (error) => {
    return Promise.reject(error);
  }
)