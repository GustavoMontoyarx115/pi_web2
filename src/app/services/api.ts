// src/services/api.ts
import axios from "axios";

// URL base del backend (viene del .env.local)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
