"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";

import logo from "../../assetes/Logo.png";
import Modal from "./Modal"; 
import { Colors } from "../../app/config/theme/Colors";
import { logout } from "../../utils/Logout";

const Header2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/notifications/unread`, {
          headers: { Authorization: token },
          credentials: "include"
        });
  
        if (response.ok) {
          const data = await response.json();
          setHasNotifications(data.length > 0);  
        }
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };
  
    fetchNotifications();
  }, []);
  
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
            {hasNotifications ? (
              <IoIosNotifications 
                style={{ 
                  color: Colors.primary, 
                  marginRight: "15px", 
                  cursor: "pointer",
                  fontSize: "1.25rem"
                }} 
              />
            ) : (
              <IoIosNotificationsOutline 
                style={{ 
                  color: Colors.primary, 
                  marginRight: "15px", 
                  cursor: "pointer",
                  fontSize: "1.25rem"
                }} 
              />
            )}
            <button 
              style={{ 
                color: Colors.primary, 
                background: "none", 
                border: "none", 
                cursor: "pointer",
                fontSize: "1rem",
                padding: 0,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }} 
              onClick={() => setIsModalOpen(true)}
            >
              <TbLogout 
                style={{ 
                  color: Colors.primary,
                  fontSize: "1.25rem"
                }} 
              />
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