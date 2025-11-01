// src/services/api.ts
import axios from "axios";

// ✅ Crear instancia principal de Axios
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`, // 🔥 se agrega "/api" aquí
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor para añadir automáticamente el token en cada petición
api.interceptors.request.use(   
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ (Opcional) Interceptor para capturar respuestas 401 y actuar (logout o alerta)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Sesión expirada o token inválido. Por favor inicia sesión nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default api;
