import { User } from "./user";
import { Clinic } from "./clinic";

export interface Appointment {
  id: number;
  nombre: string;
  correo: string;
  fecha: string;   // viene como LocalDate -> string en JSON
  hora: string;    // viene como LocalTime -> string en JSON
  medico: string;
  user: User;
  clinic: Clinic;
}