import React from 'react';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAE8]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-center mb-16 text-3xl text-[#8C7771]">Bienvenido otra vez</h1>
      <p className="text-center mb-8 text-mb text-[#8C7771]">Por favor ingresa con tu usuario y contraseña</p>
      <form>
        <div className="mb-8 relative">
            <label className="block text-sm font-medium mb-2 text-[#8C7771]" htmlFor="usuario">
            Usuario
            </label>
            <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8C7771]" />
                <input
                    type="text"
                    id="usuario"
                    className="w-full px-10 py-2 border rounded-lg text-[#8C7771] focus:outline-none"
                    placeholder="Ingresa tu usuario"
                />
            </div>
        </div>

        <div className="mb-8">
            <label className="block text-sm font-medium mb-2 text-[#8C7771]" htmlFor="contraseña">
            Contraseña
            </label>
            <div className="relative">
                <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8C7771]"/>
                <input
                type="password"
                id="contraseña"
                    className="w-full px-10 py-2 border rounded-lg text-[#8C7771] focus:outline-none"
                placeholder="Ingresa tu contraseña"
                />
            </div>
        </div>

        <button
            type="submit"
            className="w-full bg-[#8C7771] text-white py-2 rounded-lg hover:bg-[#7A665E]"
        >
            Ingresar
        </button>
        </form>

      </div>
    </div>
  );
};

export default LoginForm;