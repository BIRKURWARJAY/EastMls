'use client'

import axios from "axios";

const token = typeof window !== "undefined" && JSON.parse(document.cookie?.split('; ').find(row => row.startsWith('EastMls='))?.split('=')[1]).token || undefined;

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURI,
  withCredentials: true,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  () => {
    if (!token) {
      return window.location.href = "/login";
    }
  }
)


api.interceptors.response.use(
  res => {
    console.log("Response received:", res);
    if (res.status === 200) document.cookie = `EastMls=${JSON.stringify({ token: res.data.token })}; path=/; expiresIn=7d; `;
    return res;
  },

  async err => {
    
    if (err.response.status === 401) {
      const res = await api.post('/auth/refresh-token', {}, { withCredentials: true });
      if (res.status === 200) {
        localStorage.setItem("EastMls", JSON.stringify({ token: res.data.token }));
        return api.request(err.config);
      }
      return Promise.reject(err);
    }

    if (err.response.status === 420) {
      localStorage.removeItem("EastMls");
      window.location.href = "/login";
      return Promise.reject(err);
    }
  }
)