'use client';

import React, { useState, FormEvent, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  propertyId: number; 
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  propertyId 
}) => {
  const [name, setName] = useState<string>("");
  const [ci, setCi] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!ci || !name) {
      setError("CI y Nombre son campos obligatorios");
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    const requestData = {
      ci: ci.trim(),
      name: name.trim(),
      phone: phone.trim() || null // Envía null si phone está vacío
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/customer`,
        requestData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );
      
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error al crear cliente:", error);
      setError(
        error.response?.data?.message || 
        "Error al guardar el cliente. Por favor intente nuevamente."
      );
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width: "500px", padding: "30px" }}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1 style={styles.titel}>Agregar un nuevo adjudicatario</h1>

        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px',
            padding: '10px',
            backgroundColor: '#FFEBEE',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Nombre*</label>
            <input
              type="text"
              style={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Carnet de identidad*</label>
            <input
              type="number"
              style={styles.formInput}
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Celular</label>
            <input
              type="number" 
              style={styles.formInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          
          <div style={styles.buttonsContainer}>
            <button 
              type="button"
              onClick={onClose} 
              style={styles.cancelButton}
            >
              Cancelar
            </button>
            <button 
              type="submit"
              style={styles.confirmButton}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCustomerModal;