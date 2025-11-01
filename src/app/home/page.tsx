"use client";

import { useEffect, useState } from "react";

export default function ClinicPage() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://hips.hearstapps.com/hmg-prod/images/clinica-imema-interior-16-1654787717.jpg?resize=980:*",
    "https://dermatologia.pe/wp-content/uploads/2023/12/Cuales-son-las-mejores-clinicas-dermatologicas-en-Trujillo-1024x683.jpg",
    "https://dermatologia.pe/wp-content/uploads/2024/01/mejores-clinicas-dermatologicas-en-Arequipa.jpg",
  ];

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 🔹 MENÚ DE NAVEGACIÓN */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">
            Clínica Dermatológica
          </h1>
          <ul className="flex space-x-6">
            <li><a href="/service" className="hover:text-blue-200">Servicios</a></li>
            <li><a href="#informacion" className="hover:text-blue-200">Información</a></li>
            <li><a href="#usuarios" className="hover:text-blue-200">Usuarios</a></li>
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

      {/* 🔹 TÍTULO DE BIENVENIDA */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-3">
          Bienvenido a Clínica Dermatológica
        </h2>
        <p className="text-gray-700 text-lg">
          Cuidamos tu piel con los mejores profesionales y tecnología avanzada.
        </p>
      </section>

      {/* 🔹 CARRUSEL DE IMÁGENES */}
      <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg mb-16">
        <img
          src={images[currentImage]}
          alt={`Imagen ${currentImage + 1}`}
          className="w-full h-96 object-cover transition-all duration-700"
        />
        <button
          onClick={() =>
            setCurrentImage((currentImage - 1 + images.length) % images.length)
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-blue-800 rounded-full p-2 hover:bg-white transition"
        >
          ◀
        </button>
        <button
          onClick={() => setCurrentImage((currentImage + 1) % images.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/70 text-blue-800 rounded-full p-2 hover:bg-white transition"
        >
          ▶
        </button>

        <div className="absolute bottom-3 w-full flex justify-center space-x-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === currentImage ? "bg-blue-800" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 🔹 NUESTRO EQUIPO DE TRABAJO */}
      <section className="py-16 bg-blue-50 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Nuestro Equipo de Trabajo
        </h2>
        <img
          src="https://media.istockphoto.com/id/513438487/es/foto/m%C3%A9dicos-y-enfermeras-sonriendo-en-el-pasillo-del-hospital.jpg?s=612x612&w=0&k=20&c=HGXqwVl0lpGAe-XTGf1zs8u7jbzy2-_CfOdcZrdpiM8="
          alt="Equipo médico"
          className="mx-auto w-3/4 max-w-3xl rounded-2xl shadow-md mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
          {[
            { nombre: "Dr. Juan Pérez", especialidad: "Dermatología Clínica" },
            { nombre: "Dra. Laura Gómez", especialidad: "Dermatología Estética" },
            { nombre: "Dr. Andrés Torres", especialidad: "Cirugía Dermatológica" },
            { nombre: "Dra. Sofía Morales", especialidad: "Tratamientos Láser" },
            { nombre: "Dr. Carlos Medina", especialidad: "Pediatría Dermatológica" },
            { nombre: "Dra. Valeria Ruiz", especialidad: "Alergología Cutánea" },
          ].map((medico, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold text-blue-700">
                {medico.nombre}
              </h3>
              <p className="text-gray-600">{medico.especialidad}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 LOCALIZACIONES */}
      <section className="py-16 bg-white" id="informacion">
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-12">
          Nuestras Clínicas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto px-6">
          {[
            {
              nombre: "Clínica Central",
              direccion: "Calle 45 #10-23, Bogotá",
              horario: "Lunes a Sábado: 8:00 AM - 6:00 PM",
              mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.8364237518944!2d-74.06282782504966!3d4.648283942177773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99b3f2f8b8ab%3A0x5e0e9ed4d5e3279!2sChapinero%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1696039572154!5m2!1ses!2sco",
            },
            {
              nombre: "Clínica Norte",
              direccion: "Cra 15 #120-45, Bogotá",
              horario: "Lunes a Viernes: 9:00 AM - 5:00 PM",
              mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.650598237213!2d-74.0477137250495!3d4.676190142158161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9a9f1a37f82d%3A0xd5111d2d2cb4b46a!2sUsaqu%C3%A9n%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1696040023123!5m2!1ses!2sco",
            },
            {
              nombre: "Clínica Sur",
              direccion: "Av. Caracas #45-20, Bogotá",
              horario: "Lunes a Sábado: 8:00 AM - 5:00 PM",
              mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.056186084562!2d-74.10498022504993!3d4.610353342195878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f995cf67d87c3%3A0x9a38e24f1b05483d!2sRestrepo%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1696040128354!5m2!1ses!2sco",
            },
            {
              nombre: "Clínica del norte",
              direccion: "Av. Caracas #70-20, Cali",
              horario: "Lunes a Sábado: 8:00 AM - 5:00 PM",
              mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.056186084562!2d-74.10498022504993!3d4.610353342195878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f995cf67d87c3%3A0x9a38e24f1b05483d!2sRestrepo%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1696040128354!5m2!1ses!2sco",
            }
          ].map((clinica, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                {clinica.nombre}
              </h3>
              <iframe
                src={clinica.mapa}
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-xl mb-4"
              ></iframe>
              <p className="text-gray-700 font-medium">
                📍 Dirección: {clinica.direccion}
              </p>
              <p className="text-gray-700 font-medium">
                🕒 Horario: {clinica.horario}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="bg-blue-900 text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Clínica Dermatológica</h3>
            <p className="text-sm text-gray-300">
              Cuidamos tu piel con dedicación, ciencia y pasión. Nuestra
              prioridad es tu bienestar y confianza.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Enlaces rápidos</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/service" className="hover:text-white">Servicios</a></li>
              <li><a href="#informacion" className="hover:text-white">Información</a></li>
              <li><a href="#usuarios" className="hover:text-white">Usuarios</a></li>
              <li><a href="/appointment" className="hover:text-white">Agendar Cita</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Contáctanos</h3>
            <p className="text-sm text-gray-300">
              📞 Teléfono: +57 310 456 7890
            </p>
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
