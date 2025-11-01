// src/services/appointmentService.ts
import api from "./api";
import { User } from "./userService";
import { Clinic } from "./clinicServices";

export interface Appointment {
  id?: number;
  nombre: string;
  correo: string;
  fecha: string; // formato ISO corto: "2025-10-31"
  hora: string;  // formato: "14:30"
  medico: string;
  clinicId?: number; // puede no venir del frontend
  userId?: number;   // opcional si el usuario está autenticado
  user?: User;
  clinic?: Clinic;
}

// 🔒 Obtener encabezado de autorización
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// 🔧 Normalizar los datos antes de enviar al backend
function normalizeAppointmentData(appointment: Appointment) {
  const normalizedFecha = appointment.fecha.includes("T")
    ? appointment.fecha.split("T")[0]
    : appointment.fecha;

  const normalizedHora =
    appointment.hora.length > 5
      ? appointment.hora.substring(0, 5)
      : appointment.hora;

  // Si no viene clinicId, usar el valor por defecto (1)
  const clinicIdFinal = appointment.clinicId ?? 1;

  return {
    ...appointment,
    fecha: normalizedFecha,
    hora: normalizedHora,
    clinicId: clinicIdFinal,
  };
}

// 🌐 Servicio principal de citas
export const appointmentService = {
  getAll: async (): Promise<Appointment[]> =>
    (await api.get("/appointments", { headers: getAuthHeader() })).data,

  getById: async (id: number): Promise<Appointment> =>
    (await api.get(`/appointments/${id}`, { headers: getAuthHeader() })).data,

  create: async (appointment: Appointment): Promise<Appointment> => {
    const normalized = normalizeAppointmentData(appointment);
    console.log("📤 Enviando cita al backend:", normalized);
    return (
      await api.post("/appointments", normalized, {
        headers: getAuthHeader(),
      })
    ).data;
  },

  update: async (id: number, appointment: Appointment): Promise<Appointment> => {
    const normalized = normalizeAppointmentData(appointment);
    return (
      await api.put(`/appointments/${id}`, normalized, {
        headers: getAuthHeader(),
      })
    ).data;
  },

  delete: async (id: number): Promise<void> =>
    await api.delete(`/appointments/${id}`, { headers: getAuthHeader() }),
};
