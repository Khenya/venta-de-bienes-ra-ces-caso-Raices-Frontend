"use client";

import logo from "../../assetes/Logo.png";
import { Colors } from "../../app/config/theme/Colors";
import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";
import Modal from "./Modal"; 
import { logout } from "../../utils/Logout";

const Header2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#8C756A",
        color: "white",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
      }}>
        <nav style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 40px",
          width: "100%",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
          }}>
            <Image 
              src={logo} 
              alt="Logo" 
              width={56} 
              height={56} 
              className="object-contain"
            />
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginRight: "40px",
          }}>
            <a 
              href="/Plano" 
              style={{ 
                color: Colors.primary, 
                marginRight: "15px",
                textDecoration: "none"
              }}
            >
              Plano
            </a>
            <a 
              href="/List" 
              style={{ 
                color: Colors.primary, 
                marginRight: "15px",
                textDecoration: "none"
              }}
            >
              Listado
            </a>
            <TbLogout 
              style={{ 
                color: Colors.primary, 
                marginRight: "15px", 
                cursor: "pointer",
                fontSize: "1.25rem"
              }} 
              onClick={() => setIsModalOpen(true)}
            />
            <button 
              style={{ 
                color: Colors.primary, 
                background: "none", 
                border: "none", 
                cursor: "pointer",
                fontSize: "1rem",
                padding: 0,
                margin: 0
              }} 
              onClick={() => setIsModalOpen(true)}
            >
              Cerrar Sesión
            </button>
          </div>
        </nav>
      </header>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={logout}
        text="¿Seguro que quieres cerrar sesión?"
      />
    </>
  );
};

export default Header2;