'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appointmentService, Appointment } from "@/services/appointmentService";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAll();
        // 🔧 Normalizamos formato de fecha/hora para visualización
        const formatted = data.map(a => ({
          ...a,
          fecha: a.fecha ? a.fecha.split("T")[0] : "",
          hora: a.hora ? a.hora.substring(0, 5) : "",
        }));
        setAppointments(formatted);
      } catch (err) {
        console.error("❌ Error al cargar las citas:", err);
        alert("❌ Error al cargar las citas");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("¿Seguro quieres eliminar esta cita?")) return;

    try {
      await appointmentService.delete(id);
      setAppointments(prev => prev.filter(a => a.id !== id));
      alert("✅ Cita eliminada correctamente");
    } catch (err) {
      console.error("❌ Error al eliminar la cita:", err);
      alert("❌ Error al eliminar la cita");
    }
  };

  if (loading) return <p className="p-4">Cargando citas...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🩺 Citas</h1>

      <button
        onClick={() => router.push("/appointments/new")}
        className="bg-blue-600 text-white py-2 px-4 rounded mb-4 hover:bg-blue-700"
      >
        Nueva cita
      </button>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No hay citas registradas.</p>
      ) : (
        <table className="w-full border-collapse border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Nombre</th>
              <th className="border px-2 py-1">Correo</th>
              <th className="border px-2 py-1">Fecha</th>
              <th className="border px-2 py-1">Hora</th>
              <th className="border px-2 py-1">Médico</th>
              <th className="border px-2 py-1">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td className="border px-2 py-1">{a.nombre}</td>
                <td className="border px-2 py-1">{a.correo}</td>
                <td className="border px-2 py-1">{a.fecha}</td>
                <td className="border px-2 py-1">{a.hora}</td>
                <td className="border px-2 py-1">{a.medico}</td>
                <td className="border px-2 py-1 space-x-2">
                  <button
                    onClick={() => router.push(`/appointments/${a.id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
