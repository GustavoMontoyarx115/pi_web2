"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { userService } from "@/services/userService";
import type { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>({
    nombre: "",
    email: "",
    password: "",
    tipoDocumento: "",
    numeroDocumento: "",
    rol: "PACIENTE",
  });

  // 🔹 Obtener usuario por ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getById(userId);
        setUser(data as User); // 👈 asegura tipo
        setFormData(data as User);
      } catch (error) {
        console.error(error);
        toast.error("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // 🔹 Manejar cambios
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Guardar cambios
  const handleSave = async () => {
    try {
      await userService.update(userId, formData);
      toast.success("Usuario actualizado correctamente");
      setEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar usuario");
    }
  };

  // 🔹 Eliminar usuario
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await userService.delete(userId);
      toast.success("Usuario eliminado");
      router.push("/user");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar usuario");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando usuario...</p>;
  if (!user) return <p className="text-center mt-10">Usuario no encontrado</p>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>
            {editing ? "Editar Usuario" : `Detalles de ${user.nombre}`}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="tipoDocumento"
            placeholder="Tipo de documento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            disabled={!editing}
          />
          <Input
            name="numeroDocumento"
            placeholder="Número de documento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            disabled={!editing}
          />
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            disabled={!editing}
            className="w-full border rounded-md p-2"
          >
            <option value="PACIENTE">Paciente</option>
            <option value="MEDICO">Médico</option>
            <option value="ADMIN">Administrador</option>
          </select>

          <div className="flex gap-3 pt-4">
            {editing ? (
              <>
                <Button onClick={handleSave}>Guardar</Button>
                <Button variant="outline" onClick={() => setEditing(false)}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setEditing(true)}>Editar</Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Eliminar
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
