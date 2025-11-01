"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error al cargar servicios:", err));
  }, []);

  const defaultServices = [
    {
      id: 1,
      titulo: "Consulta Dermatológica General",
      descripcion:
        "Evaluación completa de la piel para diagnóstico y tratamiento de afecciones comunes.",
      imagen: "/images/service1.jpg",
    },
    {
      id: 2,
      titulo: "Tratamientos Faciales",
      descripcion:
        "Limpieza profunda, hidratación y rejuvenecimiento para todo tipo de piel.",
      imagen: "/images/service2.jpg",
    },
    {
      id: 3,
      titulo: "Dermatología Pediátrica",
      descripcion:
        "Cuidado especializado para la piel de bebés, niños y adolescentes.",
      imagen: "/images/service3.jpg",
    },
    {
      id: 4,
      titulo: "Control de Acné",
      descripcion:
        "Diagnóstico y tratamiento personalizado para mejorar la salud y apariencia de tu piel.",
      imagen: "/images/service4.jpg",
    },
    {
      id: 5,
      titulo: "Tratamientos Láser",
      descripcion:
        "Tecnología avanzada para eliminar manchas, cicatrices y mejorar la textura de la piel.",
      imagen: "/images/service5.jpg",
    },
    {
      id: 6,
      titulo: "Cirugía Dermatológica",
      descripcion:
        "Procedimientos menores para extirpar lesiones cutáneas de forma segura y estética.",
      imagen: "/images/service6.jpg",
    },
  ];

  const displayedServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 🔹 MENÚ DE NAVEGACIÓN */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            Clínica Dermatológica
          </h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-blue-200">
                Inicio
              </a>
            </li>
            <li>
              <a href="/service" className="hover:text-blue-200">
                Servicios
              </a>
            </li>
            <li>
              <a href="#usuario" className="hover:text-blue-200">
                Usuario
              </a>
            </li>
            <li>
              <a
                href="/appointment"
                className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                Agendar Cita
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <div className="p-8 max-w-6xl mx-auto">
        {/* Título y descripción */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-sky-700 mb-3">
            Nuestros Servicios
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            En esta sección podrás conocer todos los servicios dermatológicos
            que ofrecemos, cada uno diseñado para cuidar tu piel con atención
            profesional y tecnología avanzada.
          </p>
        </div>

        {/* 🔹 TARJETAS DE SERVICIOS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {displayedServices.map((service: any) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border border-gray-100"
            >
              {service.imagen && (
                <img
                  src={service.imagen}
                  alt={service.titulo}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-sky-800 mb-2 text-center">
                {service.titulo}
              </h2>
              <p className="text-gray-600 text-sm text-center">
                {service.descripcion}
              </p>
              <div className="text-center mt-4">
                <Link
                  href={`/services/${service.id}`}
                  className="text-sky-600 font-medium hover:underline"
                >
                  Ver detalle →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 BOTÓN CENTRADO DEBAJO DE LAS TARJETAS */}
        <div className="flex justify-center mt-8">
          <Link
            href="/service/new"
            className="bg-sky-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-sky-700 transition text-lg font-medium"
          >
            ➕ Registrar nuevo servicio
          </Link>
        </div>
      </div>
    </div>
  );
}
