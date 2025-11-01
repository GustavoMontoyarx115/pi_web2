"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  const defaultServices = [
    {
      id: 1,
      titulo: "Consulta Dermatológica General",
      descripcion:
        "Evaluación completa de la piel para diagnóstico y tratamiento de afecciones comunes.",
      imagen:
        "https://segurossura.com/content/uploads/sites/10/2022/01/seguros-sura-se-saludable-consulta-dermatologo.jpg",
    },
    {
      id: 2,
      titulo: "Tratamientos Faciales",
      descripcion:
        "Limpieza profunda, hidratación y rejuvenecimiento para todo tipo de piel.",
      imagen:
        "https://dermaheilen.com/wp-content/uploads/2023/07/tratamiento_acne_adultos.jpg",
    },
    {
      id: 3,
      titulo: "Dermatología Pediátrica",
      descripcion:
        "Cuidado especializado para la piel de bebés, niños y adolescentes.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Uufs2FW0_9dV4nTe1EGTvkZ80lMuxq_54w&s",
    },
    {
      id: 4,
      titulo: "Control de Acné",
      descripcion:
        "Diagnóstico y tratamiento personalizado para mejorar la salud y apariencia de tu piel.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgQWGbc1x5jbACcJHGFN2vkF08c1w70QpxwQ&s",
    },
    {
      id: 5,
      titulo: "Tratamientos Láser",
      descripcion:
        "Tecnología avanzada para eliminar manchas, cicatrices y mejorar la textura de la piel.",
      imagen:
        "https://www.flowww.es/hubfs/Q12023%20Marzo/Im%C3%A1genes%20blog/20-tratamientos-esteticos-mas-demandados-belen-cuendias-flowww.webp",
    },
    {
      id: 6,
      titulo: "Cirugía Dermatológica",
      descripcion:
        "Procedimientos menores para extirpar lesiones cutáneas de forma segura y estética.",
      imagen:
        "https://www.ritomarino.co/wp-content/uploads/2020/09/cirugia-estetica-mayores-60-a%C3%B1os.jpg",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        } else {
          setServices(defaultServices); // ✅ mantiene las tarjetas por defecto
        }
      })
      .catch((err) => {
        console.error("Error al cargar servicios:", err);
        setServices(defaultServices); // ✅ en caso de error, usa los predeterminados
      });
  }, []);

  const displayedServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* 🔹 MENÚ DE NAVEGACIÓN */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            Clínica Dermatológica
          </h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/home" className="hover:text-blue-200">
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
                href="/appointments"
                className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                Agendar Cita
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* 🔹 CONTENIDO PRINCIPAL */}
      <main className="flex-grow p-8 max-w-6xl mx-auto">
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
      </main>

      {/* 🔹 FOOTER */}
      <footer className="bg-blue-900 text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Clínica Dermatológica
            </h3>
            <p className="text-sm text-gray-300">
              Cuidamos tu piel con dedicación, ciencia y pasión. Nuestra
              prioridad es tu bienestar y confianza.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Enlaces rápidos</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>
                <a href="/service" className="hover:text-white">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#informacion" className="hover:text-white">
                  Información
                </a>
              </li>
              <li>
                <a href="#usuarios" className="hover:text-white">
                  Usuarios
                </a>
              </li>
              <li>
                <a href="/appointment" className="hover:text-white">
                  Agendar Cita
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contáctanos</h3>
            <p className="text-sm text-gray-300">📞 Teléfono: +57 310 456 7890</p>
            <p className="text-sm text-gray-300">
              ✉️ Email: contacto@clinicadermatologica.com
            </p>
            <p className="text-sm text-gray-300">Bogotá, Colombia</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-700 pt-4">
          © 2025 Clínica Dermatológica. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
