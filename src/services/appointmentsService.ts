import api from "./api";
import { User } from "./userService";
import { Clinic } from "./clinicServices";

export interface Appointment {
  id?: number;
  nombre: string;
  correo: string;
  fecha: string;  // "2025-10-04"
  hora: string;   // "14:00:00"
  medico: string;
  user?: User;
  clinic?: Clinic;
}

export const appointmentService = {
  // ✅ Obtener todas las citas
  getAll: async (): Promise<Appointment[]> => (await api.get("/appointments")).data,

  // ✅ Obtener cita por ID
  getById: async (id: number): Promise<Appointment> =>
    (await api.get(`/appointments/${id}`)).data,

  // ✅ Crear nueva cita
  create: async (appointment: Appointment): Promise<Appointment> =>
    (await api.post("/appointments", appointment)).data,

  // ✅ Actualizar cita existente
  update: async (id: number, appointment: Appointment): Promise<Appointment> =>
    (await api.put(`/appointments/${id}`, appointment)).data,

  // ✅ Eliminar cita
  delete: async (id: number): Promise<void> =>
    await api.delete(`/appointments/${id}`),
};
