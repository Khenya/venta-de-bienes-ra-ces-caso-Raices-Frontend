'use client';
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

import styles from '../../app/config/theme/Card.module.css';

interface Customer {
  name?: string;
  phone?: string;
  ci?: string;
}

interface AdjudicatorCardProps {
  onAddClick: () => void;
  customer?: Customer | null;
}

const AdjudicatorCard: React.FC<AdjudicatorCardProps> = ({ onAddClick, customer }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.propertyCardHeader}>
        <span className={styles.propertyCardTitle}>Adjudicatario</span>
      </div>
      
      {customer ? (
        <div className="space-y-2">
          <p><span className="font-semibold">Nombre:</span> {customer.name}</p>
          <p><span className="font-semibold">CI:</span> {customer.ci}</p>
          <p><span className="font-semibold">Celular:</span> {customer.phone}</p>
        </div>
      ) : (
        isAdmin && (
          <div className={styles.emptyAdjudicatorContainer}>
            <button 
              onClick={onAddClick}
              className={styles.adjudicatorButton}
            >
              Agregar un adjudicatario
            </button>
            <p className={styles.adjudicatorHint}>
              Para agregar un adjudicatario debes cambiar el estado a "RESERVADO" o "CANCELADO"
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AdjudicatorCard;