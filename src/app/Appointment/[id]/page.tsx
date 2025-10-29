'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Appointment {
  id?: number;
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  medico: string;
  clinicId: number;
  clinicName?: string;
}

export default function AppointmentDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Obtener la cita por ID
  useEffect(() => {
    if (!id) return;
    fetch(`${API_URL}/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => setAppointment(data))
      .catch((err) => console.error('Error al cargar la cita:', err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar esta cita?')) return;
    const res = await fetch(`${API_URL}/appointments/${id}`, { method: 'DELETE' });
    if (res.ok) {
      alert('🗑️ Cita eliminada correctamente');
      router.push('/appointments');
    } else {
      alert('⚠️ Error al eliminar la cita');
    }
  };

  if (loading) return <p className="p-8 text-center text-gray-500">Cargando cita...</p>;
  if (!appointment) return <p className="p-8 text-center text-red-500">Cita no encontrada.</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Detalles de la Cita #{appointment.id}
      </h1>

      <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6 space-y-3">
        <p><strong>Paciente:</strong> {appointment.nombre}</p>
        <p><strong>Correo:</strong> {appointment.correo}</p>
        <p><strong>Fecha:</strong> {appointment.fecha}</p>
        <p><strong>Hora:</strong> {appointment.hora}</p>
        <p><strong>Médico:</strong> {appointment.medico}</p>
        <p><strong>Clínica:</strong> {appointment.clinicName}</p>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => router.push(`/appointments/edit/${appointment.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            ✏️ Editar
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
