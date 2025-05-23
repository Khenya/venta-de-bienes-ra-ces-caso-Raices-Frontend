"use client";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { jwtDecode } from "jwt-decode";

import api from "../../utils/api";
import { Colors } from "@/app/config/theme/Colors";

const LoginForm = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/api/auth/login", {
        username: usuario,
        password: contraseña,
      });

      if (!response.data || !response.data.token) {
        throw new Error("No se recibió un token válido");
      }

      const token = response.data.token;
      localStorage.setItem("token", token);

      const decoded: any = jwtDecode(token);
      const role = decoded?.role;

      if (role === "admin") {
        window.location.href = "/Dashboard";
      } else {
        window.location.href = "/Plano";
      }

    } catch {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Render en cliente");
    }
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 h-100"
      style={{ backgroundColor: Colors.primary }}
    >
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderColor: Colors.text_color,
          borderWidth: "1px",
          borderStyle: "solid",
          color: Colors.text_color,
        }}
      >
        <h2 className="text-center mb-2" style={{ color: Colors.text_color }}>
          Bienvenido otra vez
        </h2>
        <p className="text-center mb-4" style={{ color: Colors.text_color }}>
          Por favor ingresa con tu usuario y contraseña
        </p>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="usuario"
              className="form-label"
              style={{ color: Colors.text_color }}
            >
              Usuario
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ color: Colors.text_color }}>
                <FaUser />
              </span>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                style={{ color: Colors.text_color }}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="contraseña"
              className="form-label"
              style={{ color: Colors.text_color }}
            >
              Contraseña
            </label>
            <div className="input-group">
              <span className="input-group-text" style={{ color: Colors.text_color }}>
                <RiLockPasswordFill />
              </span>
              <input
                type={mostrarContraseña ? "text" : "password"}
                className="form-control"
                id="contraseña"
                placeholder="Ingresa tu contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                style={{ color: Colors.text_color }}
                required
              />
              <button
                type="button"
                className="input-group-text bg-transparent border-start-0"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
                style={{ cursor: "pointer", color: Colors.text_color }}
              >
                {mostrarContraseña ? <FiEye /> : <FiEyeOff />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: Colors.text_color,
              color: Colors.primary,
              border: "none",
            }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;