"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // 👈 Importar Link para navegación interna

interface Appointment {
  id: number;
  nombre: string;
  correo: string;
  fecha: string;
  hora: string;
  medico: string;
  clinicId: number;
  clinicName: string;
}

interface Clinic {
  id: number;
  name: string;
  description?: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  appointments?: Appointment[];
}

export default function ClinicsPage() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/clinics")
      .then((res) => res.json())
      .then((data) => setClinics(data))
      .catch((error) => console.error("Error al cargar clínicas:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-gray-600">Cargando clínicas...</p>;

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800">
          Clínicas Registradas
        </h1>

        {/* 🔹 Botón para crear nueva clínica */}
        <Link
          href="http://localhost:3000/clinic/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        >
          + Nueva Clínica
        </Link>
      </div>

      {/* Listado de clínicas */}
      {clinics.length === 0 ? (
        <p className="text-gray-600">No hay clínicas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-lg font-semibold text-blue-700">
                {clinic.name}
              </h2>
              <p className="text-sm text-gray-600">{clinic.address}</p>
              <p className="text-sm text-gray-600">{clinic.phone}</p>

              {clinic.appointments && clinic.appointments.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-medium text-gray-700 mb-1">Citas:</h3>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {clinic.appointments.map((app) => (
                      <li key={app.id}>
                        <strong>{app.medico}</strong> — {app.fecha} a las{" "}
                        {app.hora}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
