"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/services") // Cambia el puerto si tu backend usa otro
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error al cargar servicios:", err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-sky-700 mb-6">Servicios</h1>

      <Link
        href="/services/new"
        className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
      >
        ➕ Nuevo servicio
      </Link>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: any) => (
          <div
            key={service.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            {service.imagen && (
              <img
                src={service.imagen}
                alt={service.alt || "imagen servicio"}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}
            <h2 className="text-xl font-semibold text-sky-800">
              {service.titulo}
            </h2>
            <p className="text-gray-600 mt-2">{service.descripcion}</p>
            <Link
              href={`/services/${service.id}`}
              className="text-sky-600 font-medium mt-3 inline-block"
            >
              Ver detalle →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
