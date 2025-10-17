"use client";

import { useEffect, useState } from "react";
export interface Appointment {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  medico: string;
}

class AppointmentService {
  async getAll(): Promise<Appointment[]> {
    const response = await fetch('/api/appointments');
    return response.json();
  }
}

export const appointmentService = new AppointmentService();

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentService
      .getAll()
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => {
        console.error("Error al cargar citas:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Listado de Citas</h1>

      {appointments.length === 0 ? (
        <p>No hay citas registradas</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.id}>
              <strong>{a.nombre}</strong> — {a.fecha} — {a.hora} — {a.medico}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
