'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'sonner'; // ✅ Usamos la librería Sonner para notificaciones

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
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState<Appointment>({
    nombre: '',
    correo: '',
    fecha: '',
    hora: '',
    medico: '',
    clinicId: 1,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://pi-backend2-tq8j.onrender.com'; // ⚙️ Reemplaza con tu endpoint real

  // 🔹 Cargar cita existente
  useEffect(() => {
    if (!id) return;
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Error al cargar la cita');
        const data: Appointment = await res.json();
        setForm(data);
      } catch (err: any) {
        setError(err.message);
        toast.error("Error al cargar la cita", { description: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  // 🔹 Manejo de cambios
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Guardar cambios (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Error al actualizar la cita');

      // ✅ Notificación de éxito
      toast.success("✅ Cita actualizada con éxito", {
        description: `La cita de ${form.nombre} fue modificada correctamente.`,
        duration: 3000,
      });

      // ⏳ Redirige después de 2.5 segundos
      setTimeout(() => router.push('/appointment'), 2500);

    } catch (err: any) {
      setError(err.message);
      toast.error("❌ Error al actualizar", {
        description: err.message || "No se pudo actualizar la cita",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-4">Cargando datos...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Editar cita</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Correo</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Fecha</label>
          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Hora</label>
          <input
            type="time"
            name="hora"
            value={form.hora}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Médico</label>
          <input
            type="text"
            name="medico"
            value={form.medico}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Clínica ID</label>
          <input
            type="number"
            name="clinicId"
            value={form.clinicId}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Actualizar cita'}
        </button>
      </form>
    </div>
  );
}
