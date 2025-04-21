'use client';

import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {jwtDecode} from "jwt-decode";

import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

interface ModalFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onApplyFilter: (filter: { field: string; value: string }) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isOpen, onClose, onSave, onApplyFilter }) => {
  const [selectedField, setSelectedField] = useState<string>("ESTADO");
  const [ownerOption, setOwnerOption] = useState<string>("TODOS");
  const [textValue, setTextValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [stateOption, setStateOption] = useState<string>("LIBRE");
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  useEffect(() => {
    if (selectedField === "DUEÑO") {
      setIsFormValid(ownerOption.trim() !== "");
    } else if (selectedField === "ESTADO") {
      setIsFormValid(stateOption.trim() !== "");
    } else {
      setIsFormValid(textValue.trim() !== "");
    }
  }, [selectedField, ownerOption, stateOption, textValue]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width: "500px", padding: "30px" }}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1 style={styles.titel}>Filtros</h1>

        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Seleccione el campo para el filtro:*</label>
            <select
              style={styles.formInput}
              value={selectedField}
              onChange={(e) => {
                const field = e.target.value;
                setSelectedField(field);
                setTextValue("");
                setOwnerOption("Aydee Choque");
                setStateOption("LIBRE"); 
              }}              
            >
              <option value="ESTADO">ESTADO</option>
              {isAdmin && <option value="DUEÑO">DUEÑO</option>}
              <option value="PRECIO">PRECIO (DOLARES)</option>
              <option value="MANZANO">MANZANO</option>
              <option value="LOTE">LOTE</option>
            </select>
          </div>

          {selectedField === "ESTADO" && (
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Seleccione un estado:</label>
              <select
                style={styles.formInput}
                value={stateOption}
                onChange={(e) => setStateOption(e.target.value)}
              >
                <option value="LIBRE">LIBRE</option>
                <option value="CANCELADO">CANCELADO</option>
                <option value="RESERVADO">RESERVADO</option>
                <option value="RETRASADO">RETRASADO</option>
                <option value="PAGANDO">PAGANDO</option>
                <option value="CADUCADO">CADUCADO</option>
              </select>
            </div>
          )}
          
          {selectedField === "DUEÑO" && isAdmin && (
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Seleccione un dueño:</label>
              <select
                style={styles.formInput}
                value={ownerOption}
                onChange={(e) => setOwnerOption(e.target.value)}
              >
                {/* <option value="TODOS">TODOS</option> */}
                <option value="Aydee Choque">Aydee Choque</option>
                <option value="German Choque">German Choque</option>
                <option value="Nancy Choque">Nancy Choque</option>
                <option value="Jose Choque">Jose Choque</option>
                <option value="Javier Choque">Javier Choque</option>
              </select>
            </div>
          )}

          {(selectedField === "PRECIO" || selectedField === "MANZANO" || selectedField === "LOTE") && (
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Ingrese el valor:</label>
              <input
                type="number"
                style={styles.formInput}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              />
            </div>
          )}

          <div style={styles.buttonsContainer}>
            <button
              onClick={() => {
                const filterValue = selectedField === "DUEÑO" 
                  ? ownerOption
                  : selectedField === "ESTADO"
                  ? stateOption  
                  : textValue;
                
                onApplyFilter({ field: selectedField, value: filterValue });
                onSave();
                onClose();
              }}
              style={{
                ...styles.confirmButton,
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? "pointer" : "not-allowed"
              }}
              disabled={!isFormValid}
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;