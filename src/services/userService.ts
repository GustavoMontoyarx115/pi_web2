// src/services/userService.ts
import api from "./api";
import { User } from "../types/user"; // Asegúrate que esta ruta sea correcta

export const userService = {
  // 🔹 Obtener todos los usuarios
  getAll: async (): Promise<User[]> => {
    const response = await api.get("/api/users");
    return response.data;
  },

  // 🔹 Obtener un usuario por ID
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },

  // 🔹 Crear un nuevo usuario
  create: async (user: User): Promise<User> => {
    const response = await api.post("/api/users", user);
    return response.data;
  },

  // 🔹 Actualizar un usuario existente
  update: async (id: number, user: User): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, user);
    return response.data;
  },

  // 🔹 Eliminar un usuario
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },

  // 🔹 Iniciar sesión
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post("/api/users/login", { email, password });
    return response.data;
  },
};

// ✅ Exporta también el tipo para que otros archivos puedan usarlo
export type { User };
