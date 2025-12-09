// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // backend API
  withCredentials: true,                // send cookies/session
});

export default api;
