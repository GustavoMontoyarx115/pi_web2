'use client';

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { appointmentService, Appointment } from "@/services/appointmentService";

export default function AppointmentDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState<Appointment>({
    nombre: "",
    correo: "",
    fecha: "",
    hora: "",
    medico: "",
    clinicId: 1,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchAppointment = async () => {
      try {
        const data = await appointmentService.getById(Number(id));
        setForm(data);
      } catch (err) {
        console.error(err);
        alert("❌ Error al cargar la cita");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentService.update(Number(id), form);
      alert("✅ Cita actualizada correctamente");
      router.push("/appointments"); // 🔹 ruta corregida
    } catch (err) {
      console.error(err);
      alert("❌ Error al actualizar la cita");
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-xl font-bold mb-4">✏️ Editar cita</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="hora" type="time" value={form.hora} onChange={handleChange} className="w-full border p-2 rounded" required />
        <input name="medico" placeholder="Médico" value={form.medico} onChange={handleChange} className="w-full border p-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Actualizar cita</button>
      </form>
    </div>
  );
}
