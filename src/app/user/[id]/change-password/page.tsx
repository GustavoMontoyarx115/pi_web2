"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { userService } from "@/services/userService";

export default function ChangePasswordPage() {
  const { id } = useParams();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  // 🔹 Traer datos del usuario (solo para mostrar su correo)
  useEffect(() => {
    if (!id) return;
    userService
      .getById(Number(id)) // ✅ CORREGIDO: antes era getUserById
      .then((user) => setUserEmail(user.email))
      .catch(() => toast.error("Error al cargar usuario"));
  }, [id]);

  // 🔹 Manejar cambio de contraseña
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword) {
      toast.error("Completa todos los campos");
      return;
    }

    setLoading(true);

    try {
      const user = await userService.getById(Number(id)); // ✅ CORREGIDO

      // ⚠️ En un entorno real esto no debería hacerse en el frontend.
      // Solo se mantiene así por fines de práctica o demo.
      if (user.password !== currentPassword) {
        toast.error("La contraseña actual es incorrecta");
        setLoading(false);
        return;
      }

      // Actualizar solo la contraseña
      await userService.update(Number(id), { ...user, password: newPassword }); // ✅ CORREGIDO

      toast.success("Contraseña actualizada correctamente");
      router.push(`/user/${id}`); // Redirige al perfil del usuario
    } catch (error) {
      toast.error("Error al actualizar la contraseña");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
          <p className="text-sm text-gray-500">
            Usuario: <span className="font-semibold">{userEmail}</span>
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Contraseña actual
              </label>
              <Input
                type="password"
                placeholder="********"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Nueva contraseña
              </label>
              <Input
                type="password"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Actualizando..." : "Guardar cambios"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
