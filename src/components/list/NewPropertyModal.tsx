import React from "react";
import { RxCross2 } from "react-icons/rx";
import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

interface NewPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const NewPropertyModal: React.FC<NewPropertyModalProps> = ({ isOpen, onClose, onSave }) => {
  
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.modal, width: "500px", padding: "30px" }}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1 style={ styles.titel}>
          Agregar un nuevo inmueble
        </h1>
        
        <div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>ESTADO*</label>
          </div>
          <select style={styles.formInput}>
            <option>LIBRE</option>
            <option>RESERVADO</option>
            <option>RETRASADO</option>
            <option>CANCELADO</option>
            <option>PAGANDO</option>
            <option>CADUCADO</option>
          </select>

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>NOMBRE DEL PROPIETARIO*</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput} 
          />

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>LOTE*</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput}
          />

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>MANZANO*</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput}
          />
         
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>DIRECCIÓN*</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput}
          />

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>METRAJE (metros)*</label>
          </div>
          <input 
            type="number" 
            style={styles.formInput}
          />

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>PRECIO (DOLARES)*</label>
          </div>
          <input 
            type="number" 
            style={styles.formInput}
          />

          <div style={styles.formGroup}>
            <label style={styles.formLabel}>NÚMERO DE FOLIO</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput}
          />
          </div>
          <div style={styles.formGroup}>
        
          <label style={styles.formLabel}>NÚMERO DE INAUEBLE</label>
          </div>
          <input 
            type="text" 
            style={styles.formInput}
          />
        
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>NÚMERO DE TESTIMONIO</label>
          </div>          <input 
            type="text" 
            style={styles.formInput}
          />

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
  );
};

export default NewPropertyModal;