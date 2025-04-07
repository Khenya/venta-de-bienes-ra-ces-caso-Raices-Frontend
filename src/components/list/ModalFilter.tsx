import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

interface ModalFilter {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const ModalFilter: React.FC<ModalFilter> = ({ isOpen, onClose, onSave }) => {
  
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width: "500px", padding: "30px" }}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1 style={ styles.titel}>
          Más Filtros
        </h1>
        
        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Seleccione el campo para el filtro:*</label>
          </div>
          <select style={styles.formInput}>
            <option>DUEÑO</option>
            <option>PRECIO (DOLARES)</option>
            <option>MANZANO</option>
            <option>LOTE</option>
          </select>      

        <div style={styles.buttonsContainer}>
          <button onClick={onClose} style={styles.cancelButton}>
            Cancelar
          </button>
          <button onClick={onSave} style={styles.confirmButton}>
            Guardar
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ModalFilter;