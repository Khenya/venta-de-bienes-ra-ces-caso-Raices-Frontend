"use client";
import { MdModeEditOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";

interface Property {
  state: string;
  price: number;
  property_number: number;
  folio_number: number;
  testimony_number: string;
}

interface PropertyCardProps {
  onEditClick: () => void;
  property: Property;
}

interface JwtPayload {
  role: string;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onEditClick, property }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setRole(decoded.role);
    }
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.propertyCardHeader}>
        <span className={styles.propertyCardTitle}>Detalles del lote</span>
        {role === "admin" && (
          <button className={styles.propertyCardEditBtn} onClick={onEditClick}>
            <MdModeEditOutline style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
            Editar
          </button>
        )}
      </div>
      <ul>
        <li><span>Estado: </span><span>{property.state}</span></li>
        <li><span>Precio (USD): </span><span>{property.price}</span></li>
        <li><div>N° DE INMUEBLE: {property.property_number}</div></li>
        <li><div>N° Registró DDRR: {property.folio_number}</div></li>
        <li><span>Número de Protocolizacion: </span><span>{property.testimony_number}</span></li>
      </ul>
    </div>
  );
};

export default PropertyCard;