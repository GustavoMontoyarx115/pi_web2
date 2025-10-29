'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Appointment {
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  medico: string;
  clinicId: number;
}

export default function NewAppointmentPage() {
  const router = useRouter();
  const [form, setForm] = useState<Appointment>({
    nombre: '',
    correo: '',
    fecha: '',
    hora: '',
    medico: '',
    clinicId: 1
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('✅ Cita creada correctamente');
      router.push('/appointments');
    } else {
      alert('⚠️ Error al crear la cita');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex justify-center">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">🩺 Nueva Cita</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="nombre"
            placeholder="Nombre del paciente"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="fecha"
            type="date"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="hora"
            type="time"
            value={form.hora}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            name="medico"
            placeholder="Nombre del médico"
            value={form.medico}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg"
          >
            Guardar Cita
          </button>
          <button
            type="button"
            onClick={() => router.push('/appointments')}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold w-full py-2 rounded-lg"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
