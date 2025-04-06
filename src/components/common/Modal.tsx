import React from "react";
import { RxCross2 } from "react-icons/rx";

import { Colors } from "@/app/config/theme/Colors";
import styles from "@/app/config/theme/styles";

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


export default Modal;