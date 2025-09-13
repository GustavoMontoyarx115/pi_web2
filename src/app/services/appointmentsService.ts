// src/app/services/appointmentsService.ts

export async function getAppointments() {
  const response = await fetch("http://localhost:8080/api/appointments", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al obtener citas");
  }

  return response.json();
}