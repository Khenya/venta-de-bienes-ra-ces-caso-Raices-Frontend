"use client";

import logo from "../../assetes/Logo.png";
import { Colors } from "../../app/config/theme/Colors";

import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import Image from "next/image";
import Modal from "./Modal"; 

const Header2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <>
      <header style={styles.header}>
        <nav style={styles.nav}>
          <div style={styles.imageContainer}>
            <Image src={logo} alt="Logo" width={56} height={56} className="object-contain" />
          </div>

          <div style={styles.linksContainer}>
            <a href="/map" style={{ color: Colors.primary, marginRight: "15px" }}>Mapa</a>
            <a href="/list" style={{ color: Colors.primary, marginRight: "15px" }}>Listado</a>
            <TbLogout 
              style={{ color: Colors.primary, marginRight: "15px", cursor: "pointer" }} 
              onClick={() => setIsModalOpen(true)}
            />
            <button 
              style={{ color: Colors.primary, background: "none", border: "none", cursor: "pointer" }} 
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
        onConfirm={handleLogout}
        text="¿Seguro que quieres cerrar sesión?"
      />
    </>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#8C756A",
    color: "white",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 40px",
    width: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
};

export default Header2;