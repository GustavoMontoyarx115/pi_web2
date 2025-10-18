"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // 🧠 Función para enviar los datos al backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      // ✅ Login exitoso → guardar usuario y redirigir
      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        console.log("Usuario autenticado:", user);

        router.push("/home"); // cambia la ruta según tu app
      }
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err);
      if (err.response?.status === 404)
        setError("❌ Usuario no encontrado");
      else if (err.response?.status === 401)
        setError("❌ Contraseña incorrecta");
      else
        setError("⚠️ Error al conectar con el servidor");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* 🟢 Lado Izquierdo (Formulario de Login) */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-10">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mx-auto mb-3"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Inicia Sesión
          </h1>
          <p className="text-gray-500">
            ¿Aún no tienes cuenta?{" "}
            <a href="/register" className="text-blue-500 font-semibold">
              Crear cuenta
            </a>
          </p>
        </div>

        {/* 🔐 Formulario */}
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md"
        >
          <label className="block text-gray-600 text-sm mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="tuemail@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <label className="block text-gray-600 text-sm mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Iniciar Sesión
          </button>

          <p className="text-center text-sm text-gray-500 mt-4 hover:text-blue-500 cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
        </form>
      </div>

      {/* 🔵 Lado Derecho (Texto e Imagen) */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Spin Your Way to Higher Conversions Today!
        </h2>
        <p className="text-gray-600 text-center leading-relaxed">
          Instantly grow conversions, boost email subscribers and reduce cart
          abandonment with our fun Coupon Wheels. <br />
          Everyone loves to win something! Our campaigns let visitors get excited
          about the chance to win a prize. Great for giveaways, launches, and
          engaging new visitors.
        </p>

        <img
          src="/login-illustration.png"
          alt="Login Illustration"
          className="w-80 mt-10"
        />
      </div>
    </div>
  );
}
