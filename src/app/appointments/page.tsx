"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { appointmentService, Appointment } from "@/services/appointmentService";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAll();
        const formatted = data.map((a) => ({
          ...a,
          fecha: a.fecha ? a.fecha.split("T")[0] : "",
          hora: a.hora ? a.hora.substring(0, 5) : "",
        }));
        setAppointments(formatted);
      } catch (err) {
        console.error("❌ Error al cargar las citas:", err);
        alert("❌ Error al cargar las citas");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!confirm("¿Seguro quieres eliminar esta cita?")) return;

    try {
      await appointmentService.delete(id);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      alert("✅ Cita eliminada correctamente");
    } catch (err) {
      console.error("❌ Error al eliminar la cita:", err);
      alert("❌ Error al eliminar la cita");
    }
  };

  if (loading) return <p className="p-4">Cargando citas...</p>;

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

      {/* 🔹 SECCIÓN DE BIENVENIDA */}
      <section className="text-center py-12 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-sky-800 mb-4">
          ¡Bienvenido a Agendar tu Cita!
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          En este campo podrás registrar, consultar y gestionar tus citas médicas.
          Nuestro equipo se encargará de hacerte una serie de consultas básicas
          para garantizar que recibas la atención dermatológica más adecuada a tus necesidades.
        </p>
        <button
          onClick={() => router.push("/appointments/new")}
          className="bg-sky-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-sky-700 transition text-lg font-medium"
        >
          🩺 Agenda tu cita
        </button>
      </section>

      {/* 🔹 TABLA DE CITAS */}
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4 text-center">
          Citas Registradas
        </h2>

        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center">No hay citas registradas.</p>
        ) : (
          <table className="w-full border-collapse border text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Nombre</th>
                <th className="border px-2 py-1">Correo</th>
                <th className="border px-2 py-1">Fecha</th>
                <th className="border px-2 py-1">Hora</th>
                <th className="border px-2 py-1">Médico</th>
                <th className="border px-2 py-1">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td className="border px-2 py-1">{a.nombre}</td>
                  <td className="border px-2 py-1">{a.correo}</td>
                  <td className="border px-2 py-1">{a.fecha}</td>
                  <td className="border px-2 py-1">{a.hora}</td>
                  <td className="border px-2 py-1">{a.medico}</td>
                  <td className="border px-2 py-1 space-x-2">
                    <button
                      onClick={() => router.push(`/appointments/${a.id}`)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

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
