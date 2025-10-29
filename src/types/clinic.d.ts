import { Appointment } from "./appointment";
import { Service } from "./service";

export interface Clinic {
  id: number;
  name: string;
  description?: string;
  address: string;
  city?: string;
  phone?: string;
  email?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  appointments?: Appointment[];
  services?: Service[];
}