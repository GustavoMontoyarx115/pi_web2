// src/services/userService.ts
import api from "./api";

export interface User {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  tipoDocumento: string;
  numeroDocumento: string;
  rol: "PACIENTE" | "MEDICO" | "ADMIN";
}

// CRUD
export const userService = {
  getAll: async (): Promise<User[]> => (await api.get("/users")).data,
  getById: async (id: number): Promise<User> => (await api.get(`/users/${id}`)).data,
  create: async (user: User): Promise<User> => (await api.post("/users", user)).data,
  update: async (id: number, user: User): Promise<User> => (await api.put(`/users/${id}`, user)).data,
  delete: async (id: number): Promise<void> => await api.delete(`/users/${id}`),
};
