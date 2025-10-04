import api from "./api";
import { User } from "./userService";
import { Clinic } from "./clinicServices";

export interface Appointment {
  id?: number;
  nombre: string;
  correo: string;
  fecha: string;  // ISO format: "2025-10-04"
  hora: string;   // "14:00:00"
  medico: string;
  user?: User;
  clinic?: Clinic;
}

export const appointmentService = {
  getAll: async (): Promise<Appointment[]> => (await api.get("/appointments")).data,
};
