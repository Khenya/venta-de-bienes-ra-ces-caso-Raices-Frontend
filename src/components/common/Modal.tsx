import React from "react";
import { RxCross2 } from "react-icons/rx";
import { CSSProperties } from "react"; 

import { Colors } from "@/app/config/theme/Colors";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, text }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.closeIcon} onClick={onClose}>
          <RxCross2 style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        </div>

        <h1>{text}</h1>
        <div style={styles.buttonsContainer}>
          <button onClick={onConfirm} style={styles.confirmButton}>
            Confirmar
          </button>
          <button onClick={onClose} style={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  confirmButton: {
    padding: "10px 20px",
    backgroundColor: Colors.text_color,
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "#ccc",
    color: "#000",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Modal;