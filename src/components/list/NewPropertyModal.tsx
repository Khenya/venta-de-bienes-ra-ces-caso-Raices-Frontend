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
  const [ownerName, setOwnerName] = useState("");
  const [batch, setBatch] = useState<number | "">("");
  const [manzano, setManzano] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [meters, setMeters] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [folioNumber, setFolioNumber] = useState<number | "">("");
  const [propertyNumber, setPropertyNumber] = useState<number | "">("");
  const [testimonyNumber, setTestimonyNumber] = useState<number | "">("");
  const [isClient, setIsClient] = useState(false);

  const isFormValid = () => {
    return (
      ownerName.trim() !== "" &&
      batch !== "" &&
      manzano !== "" &&
      location.trim() !== "" &&
      meters !== "" &&
      price !== ""
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!ownerName.trim()) return;

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return;

    const requestData = {
      state,
      owner_name: ownerName,
      batch: batch !== "" ? Number(batch) : null,
      manzano: manzano !== "" ? Number(manzano) : null,
      location,
      meters: meters !== "" ? Number(meters) : null,
      price: price !== "" ? Number(price) : null,
      folio_number: folioNumber !== "" ? Number(folioNumber) : null,
      property_number: propertyNumber !== "" ? Number(propertyNumber) : null,
      testimony_number: testimonyNumber !== "" ? Number(testimonyNumber) : null,
    };

    try {
      await axios.post(
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

        <h1 style={styles.titel}>Agregar un nuevo inmueble</h1>

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
            <label style={styles.formLabel}>NOMBRE DEL PROPIETARIO*</label>
            <input
              type="text"
              style={styles.formInput}
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>LOTE*</label>
            <input
              type="number"
              style={styles.formInput}
              value={batch}
              onChange={(e) => setBatch(Number(e.target.value))}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>MANZANO*</label>
            <input
              type="number"
              style={styles.formInput}
              value={manzano}
              onChange={(e) => setManzano(Number(e.target.value))}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>DIRECCIÓN*</label>
            <input
              type="text"
              style={styles.formInput}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>METRAJE (metros)*</label>
            <input
              type="number"
              style={styles.formInput}
              value={meters}
              onChange={(e) => setMeters(Number(e.target.value))}
              required
            />
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

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>NÚMERO DE FOLIO</label>
            <input
              type="number"
              style={styles.formInput}
              value={folioNumber}
              onChange={(e) => setFolioNumber(Number(e.target.value))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>NÚMERO DE INMUEBLE</label>
            <input
              type="number"
              style={styles.formInput}
              value={propertyNumber}
              onChange={(e) => setPropertyNumber(Number(e.target.value))}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>NÚMERO DE TESTIMONIO</label>
            <input
              type="number"
              style={styles.formInput}
              value={testimonyNumber}
              onChange={(e) => setTestimonyNumber(Number(e.target.value))}
            />
          </div>

          <div style={styles.buttonsContainer}>
            <button 
              type="submit"
              style={{
                ...styles.confirmButton,
                opacity: isFormValid() ? 1 : 0.5,
                cursor: isFormValid() ? "pointer" : "not-allowed"
              }}
              disabled={!isFormValid()}
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