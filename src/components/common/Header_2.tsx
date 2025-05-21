"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

import logo from "../../assets/Logo.png";
import Modal from "./Modal";
import { Colors } from "../../app/config/theme/Colors";
import { logout } from "../../utils/Logout";
import NotificationCard from "../notification/NotificationCard";

interface Notification {
  notification_id: number;
  manzano: number;
  batch: number;
  state: string;
  is_read: boolean;
}

const Header2: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("token");
      if (!token) return;
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/notifications`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
  
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          const unread = data.filter((n: any) => !n.is_read).length;
          setUnreadCount(unread);
        }        
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };
  
    fetchNotifications();
  
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/notifications/stream`);
  
    eventSource.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
  
      if (type === "NEW_NOTIFICATION") {
        setNotifications(prev => [payload, ...prev]);
        setUnreadCount(prev => prev + 1);
      }
    };
  
    eventSource.onerror = (err) => {
      console.error("Error en SSE:", err);
      eventSource.close();
    };
  
    return () => {
      eventSource.close();
    };
  }, []);
  
  const deleteAllNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
  
    try {
      const promises = notifications.map((n) =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/notifications/${n.notification_id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
      );
  
      await Promise.all(promises);
      setNotifications([]);
      setUnreadCount(0);
    } catch (error) {
      console.error("Error al eliminar notificaciones automáticamente:", error);
    }
  };

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        await logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const getUserRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const role = getUserRole();
    if (role === "admin") setIsAdmin(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowNotificationModal(false);
        await deleteAllNotifications(); 
      }
    };

    if (showNotificationModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotificationModal, notifications]);

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
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image src={logo} alt="Logo" width={56} height={56} className="object-contain" />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "40px" }}>
            {isAdmin && (  
              <a href="/Dashboard" style={{ color: Colors.primary, textDecoration: "none" }}>Dashboard</a> 
            )}
            <a href="/Plano" style={{ color: Colors.primary, textDecoration: "none" }}>Plano</a>
            <a href="/List" style={{ color: Colors.primary, textDecoration: "none" }}>Listado</a>
            {isAdmin && (  
              <IoSettingsOutline  
                onClick={() => router.push("/Settings")} 
                style={{ color: Colors.primary, cursor: "pointer", fontSize: "1.25rem" }} 
              />            
            )}
            {!isAdmin && (     
              <div style={{ position: 'relative' }}>
                {unreadCount > 0 ? (
                  <IoIosNotifications 
                  onClick={() => setShowNotificationModal(true)} 
                  style={{ color: Colors.primary, cursor: "pointer", fontSize: "1.25rem" }} 
                  />
                ) : (
                  <IoIosNotificationsOutline 
                  onClick={() => setShowNotificationModal(true)} 
                  style={{ color: Colors.primary, cursor: "pointer", fontSize: "1.25rem" }} 
                  />
                )}
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    backgroundColor: '#E53517',
                    color: 'white',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {unreadCount}
                  </span>
                )}
              </div>
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
              <TbLogout style={{ color: Colors.primary, fontSize: "1.25rem" }} />
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
      {showNotificationModal && (
        <div
          ref={modalRef}
          style={{
            position: "fixed",
            top: "95px",
            right: "40px",
            width: "300px",
            maxHeight: "400px",
            overflowY: "auto",
            backgroundColor: Colors.text_color,
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 100
          }}
        >
          <div>
            {notifications.length > 0 ? (
              notifications.map((n, idx) => (
                <NotificationCard
                  key={idx}
                  manzano={n.manzano}
                  batch={n.batch}
                  state={n.state}
                />
              ))
            ) : (
              <div/>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header2;