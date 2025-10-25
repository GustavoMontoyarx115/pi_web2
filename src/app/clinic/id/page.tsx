"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ClinicDetails() {
  const { id } = useParams();
  const [clinic, setClinic] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/clinics/${id}`)
        .then(response => setClinic(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  if (!clinic) return <p>Cargando clínica...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{clinic.name}</h1>
      <p>{clinic.description}</p>
      <p><strong>Dirección:</strong> {clinic.address}</p>
    </div>
  );
}
