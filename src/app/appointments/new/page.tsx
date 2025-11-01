'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { appointmentService, Appointment } from "@/services/appointmentService";

export default function NewAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState<Appointment>({
    nombre: "",
    correo: "",
    fecha: "",
    hora: "",
    medico: "",
    clinicId: 1, // puedes hacerlo dinámico luego
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentService.create(form);
      alert("✅ Cita creada correctamente");
      router.push("/appointments"); // redirige al listado correcto
    } catch (err: any) {
      console.error("❌ Error al crear la cita:", err.response || err.message);
      alert("❌ No se pudo crear la cita. Revisa el backend o CORS.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h1 className="text-xl font-bold mb-4">🩺 Nueva cita</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="fecha"
          type="date"
          value={form.fecha}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="hora"
          type="time"
          value={form.hora}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="medico"
          placeholder="Médico"
          value={form.medico}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Guardar cita
        </button>
      </form>
    </div>
  );
}
