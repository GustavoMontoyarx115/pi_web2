"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";

interface Clinic {
  id?: number;
  name: string;
  description: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
}

const ClinicPage: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = "http://localhost:8080/api/clinics";

  /** 🔹 Cargar clínicas al iniciar */
  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await axios.get(apiUrl);
      setClinics(response.data);
    } catch (error) {
      console.error("Error al cargar las clínicas:", error);
    }
  };

  /** 🔹 Manejar cambios del formulario */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedClinic) {
      setSelectedClinic({
        ...selectedClinic,
        [e.target.name]: e.target.value,
      });
    }
  };

  /** 🔹 Crear nueva clínica */
  const handleCreate = async () => {
    if (!selectedClinic) return;
    try {
      await axios.post(apiUrl, selectedClinic);
      fetchClinics();
      setSelectedClinic(null);
    } catch (error) {
      console.error("Error al crear la clínica:", error);
    }
  };

  /** 🔹 Actualizar clínica existente */
  const handleUpdate = async () => {
    if (!selectedClinic?.id) return;
    try {
      await axios.put(`${apiUrl}/${selectedClinic.id}`, selectedClinic);
      fetchClinics();
      setSelectedClinic(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error al actualizar la clínica:", error);
    }
  };

  /** 🔹 Eliminar clínica */
  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Deseas eliminar esta clínica?")) return;
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchClinics();
    } catch (error) {
      console.error("Error al eliminar la clínica:", error);
    }
  };

  /** 🔹 Limpiar formulario */
  const resetForm = () => {
    setSelectedClinic(null);
    setIsEditing(false);
  };

   return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Gestión de Clínicas</h1>

      {/* 📋 Tabla de clínicas */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="p-2">ID</th>
              <th className="p-2">Nombre</th>
              <th className="p-2">Ciudad</th>
              <th className="p-2">Teléfono</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clinics.length > 0 ? (
              clinics.map((clinic) => (
                <tr key={clinic.id} className="border-b hover:bg-blue-50">
                  <td className="p-2">{clinic.id}</td>
                  <td className="p-2">{clinic.name}</td>
                  <td className="p-2">{clinic.city}</td>
                  <td className="p-2">{clinic.phone}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={() => {
                        setSelectedClinic(clinic);
                        setIsEditing(true);
                      }}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => clinic.id && handleDelete(clinic.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-gray-500">
                  No hay clínicas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧾 Formulario de creación / edición */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {isEditing ? "Editar Clínica" : "Registrar Nueva Clínica"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={selectedClinic?.name || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={selectedClinic?.city || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            value={selectedClinic?.address || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg col-span-2"
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={selectedClinic?.phone || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={selectedClinic?.email || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg"
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={selectedClinic?.description || ""}
            onChange={handleChange}
            className="border p-2 rounded-lg col-span-2"
            rows={3}
          />
        </div>

        <div className="mt-6 flex gap-3">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
            >
              Actualizar
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Crear
            </button>
          )}
          <button
            onClick={resetForm}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClinicPage; 