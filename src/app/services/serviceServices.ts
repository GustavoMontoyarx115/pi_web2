// src/services/serviceService.ts
import api from "./api";
import { Clinic } from "./clinicServices";

export interface Service {
  id?: number;
  titulo: string;
  imagen: string;
  alt: string;
  descripcion: string;
  clinic?: Clinic;
}

export const serviceService = {
  getAll: async (): Promise<Service[]> => (await api.get("/services")).data,
  getById: async (id: number): Promise<Service> => (await api.get(`/services/${id}`)).data,
  create: async (service: Service): Promise<Service> => (await api.post("/services", service)).data,
  update: async (id: number, service: Service): Promise<Service> => (await api.put(`/services/${id}`, service)).data,
  delete: async (id: number): Promise<void> => await api.delete(`/services/${id}`),
};