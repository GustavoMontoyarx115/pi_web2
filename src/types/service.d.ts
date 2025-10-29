import { Clinic } from "./clinic";

export interface Service {
  id: number;
  titulo: string;
  imagen: string;
  alt: string;
  descripcion: string;
  clinic: Clinic;
}