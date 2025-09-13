"use client";

import { useEffect, useState } from "react";
import { getAppointments } from "../services/appointmentsService";

interface Appointment {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  medico: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppointments()
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar citas", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div>
      <h1>Listado de citas</h1>
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