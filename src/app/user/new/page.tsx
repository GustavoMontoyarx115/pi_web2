"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userService, User } from "../../../services/userService";

export default function NewUserPage() {
  const router = useRouter();

  // Estado del formulario
  const [formData, setFormData] = useState<User>({
    nombre: "",
    email: "",
    password: "",
    tipoDocumento: "",
    numeroDocumento: "",
    rol: "PACIENTE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🚀 Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Enviar datos al backend usando userService
      const newUser = await userService.create(formData);
      console.log("✅ Usuario creado:", newUser);

      alert("Usuario creado correctamente 🎉");
      router.push("/user"); // redirige al login o a la lista
    } catch (err: any) {
      console.error("❌ Error al crear usuario:", err);

      if (err.response?.status === 400)
        setError("⚠️ Verifica los datos ingresados.");
      else if (err.response?.status === 409)
        setError("❌ El correo o documento ya existe.");
      else
        setError("🚨 Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Crear nuevo usuario
      </h1>

      {error && (
        <p className="text-red-500 mb-3 text-center font-medium">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          name="tipoDocumento"
          placeholder="Tipo de documento (CC, TI, etc.)"
          value={formData.tipoDocumento}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="text"
          name="numeroDocumento"
          placeholder="Número de documento"
          value={formData.numeroDocumento}
          onChange={handleChange}
          required
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <select
          name="rol"
          value={formData.rol}
          onChange={handleChange}
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="PACIENTE">Paciente</option>
          <option value="MEDICO">Médico</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white p-2 rounded transition 
          ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Creando usuario..." : "Crear usuario"}
        </button>
      </form>
    </div>
  );
}
