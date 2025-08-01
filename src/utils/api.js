import axios from "axios";

const token = JSON.parse(localStorage.getItem("EastMls") || "{}")?.token;

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${token}`
  },
  timeout: 5000
});