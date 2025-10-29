// src/services/userService.ts
import api from "./api";


export interface User {
  id?: number; // 🔹 opcional: así sirve tanto para crear como para editar
  nombre: string;
  email: string;
  password: string;
  tipoDocumento: string;
  numeroDocumento: string;
  rol: "PACIENTE" | "MEDICO" | "ADMIN";
}


export const userService = {
  async getAll(): Promise<User[]> {
    const response = await api.get("/users");
    return response.data;
  },

  async getById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async create(user: User): Promise<User> {
    const response = await api.post("/users", user);
    return response.data;
  },

  async update(id: number, user: User): Promise<User> {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};
