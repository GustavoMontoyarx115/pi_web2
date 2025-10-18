'use client';

import { useEffect, useState } from 'react';

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

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [form, setForm] = useState<Appointment>({
    nombre: '',
    correo: '',
    fecha: '',
    hora: '',
    medico: '',
    clinicId: 1
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔹 Cargar citas al iniciar
  useEffect(() => {
    fetch(`${API_URL}/appointments`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error('Error al obtener citas:', err));
  }, []);

  // 🔹 Manejo de formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Crear nueva cita
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newAppointment = await res.json();
      setAppointments([...appointments, newAppointment]);
      setForm({ nombre: '', correo: '', fecha: '', hora: '', medico: '', clinicId: 1 });
      alert('✅ Cita creada correctamente');
    } else {
      alert('⚠️ Error al crear la cita');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">🩺 Gestión de Citas</h1>

      {/* Contenedor principal */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulario */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Nueva Cita</h2>
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
              placeholder="Correo"
              type="email"
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
          </form>
        </div>

        {/* Listado de citas */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Citas Registradas</h2>
          <div className="space-y-3">
            {appointments.length > 0 ? (
              appointments.map((a) => (
                <div key={a.id} className="border rounded-lg p-3 bg-gray-50">
                  <p className="font-semibold">{a.nombre}</p>
                  <p className="text-sm text-gray-600">{a.correo}</p>
                  <p className="text-sm text-gray-600">
                    {a.fecha} — {a.hora}
                  </p>
                  <p className="text-sm text-blue-600">{a.medico}</p>
                  <p className="text-xs text-gray-500">Clínica: {a.clinicName}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No hay citas registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
