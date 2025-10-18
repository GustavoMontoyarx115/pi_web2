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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-sky-700 mb-4">
        Crear nuevo servicio
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Texto alternativo (alt)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="ID de la clínica"
          value={clinicId}
          onChange={(e) => setClinicId(e.target.value)}
          required
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          Guardar servicio
        </button>
      </form>
    </div>
  );
}
