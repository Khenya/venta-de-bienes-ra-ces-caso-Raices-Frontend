"use client";
import React, { useState } from "react";
import { Colors } from "@/app/config/theme/Colors";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import InputField from "./InputField";

const LoginForm: React.FC = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL+"/api/auth/login" || "http://localhost:3000/api/auth/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        API_URL,
        { username: usuario, password: contraseña },
        { withCredentials: true }
      );

      console.log("Respuesta:", response);
      window.location.href = "/dashboard";
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center mb-16 text-3xl" style={{ color: Colors.text_color }}>
          Bienvenido otra vez
        </h1>
        <p className="text-center mb-8 text-mb" style={{ color: Colors.text_color }}>
          Por favor ingresa con tu usuario y contraseña
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <InputField
            label="Usuario"
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            icon={<FaUser style={{ color: Colors.text_color }} />}
            placeholder="Ingresa tu usuario"
            color={Colors.text_color}
          />

          <InputField
            label="Contraseña"
            id="contraseña"
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            icon={<RiLockPasswordFill style={{ color: Colors.text_color }} />}
            placeholder="Ingresa tu contraseña"
            color={Colors.text_color}
          />

          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg hover:bg-[#7A665E]"
            style={{ backgroundColor: Colors.text_color }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
