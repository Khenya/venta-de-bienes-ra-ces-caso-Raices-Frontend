'use client';

import React, { useState, FormEvent, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

interface NewPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NewPropertyModal: React.FC<NewPropertyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [state, setState] = useState("LIBRE");
  const [price, setPrice] = useState<number | "">("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return;

    const requestData = {
      state,
      price: price !== "" ? Number(price) : null
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/property`,
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
      console.error("Error:", error.response?.data);
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width: "500px", padding: "30px" }}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1 style={styles.titel}>Editar el inmueble</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>ESTADO*</label>
            <select 
              style={styles.formInput} 
              value={state} 
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="LIBRE">LIBRE</option>
              <option value="RESERVADO">RESERVADO</option>
              <option value="RETRASADO">RETRASADO</option>
              <option value="CANCELADO">CANCELADO</option>
              <option value="PAGANDO">PAGANDO</option>
              <option value="CADUCADO">CADUCADO</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>PRECIO (DOLARES)*</label>
            <input
              type="number"
              style={styles.formInput}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div style={styles.buttonsContainer}>
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

export default NewPropertyModal;