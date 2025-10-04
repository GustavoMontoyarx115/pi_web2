import api from "./api";

export interface Clinic {
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

export const clinicService = {
  getAll: async (): Promise<Clinic[]> => (await api.get("/clinics")).data,
};

