// src/types/user.ts
export interface User {
  id?: number; // opcional para evitar conflicto en creación
  nombre: string;
  email: string;
  password: string;
  tipoDocumento: string;
  numeroDocumento: string;
  rol: "PACIENTE" | "MEDICO" | "ADMIN";
}
