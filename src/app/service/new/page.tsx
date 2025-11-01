"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewServicePage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [alt, setAlt] = useState("");
  const [clinicId, setClinicId] = useState(""); // Debes tener clínicas creadas en tu backend

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newService = {
      titulo,
      descripcion,
      imagen,
      alt,
      clinicId: Number(clinicId),
    };

    const res = await fetch("http://localhost:8080/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newService),
    });

    if (res.ok) {
      alert("✅ Servicio creado correctamente");
      router.push("/services");
    } else {
      alert("❌ Error al crear el servicio");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-sky-700 mb-6 text-center">
          Crear Nuevo Servicio
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título del servicio"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <textarea
            placeholder="Descripción del servicio"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            rows={4}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="text"
            placeholder="URL de la imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="text"
            placeholder="Texto alternativo (alt)"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="number"
            placeholder="ID de la clínica"
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
            required
            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition"
          >
            Guardar servicio
          </button>
        </form>
      </div>
    </div>
  );
}
