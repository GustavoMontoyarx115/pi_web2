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

    