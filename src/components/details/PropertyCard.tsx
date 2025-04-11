import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";

import { MdModeEditOutline } from "react-icons/md";

const PropertyCard = () => (
  <div className={styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Detalles del lote</span>
      <button className={styles.propertyCardEditBtn}>
        <MdModeEditOutline style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        Editar
      </button>
    </div>
    <ul >
      <li>
        <span>Estado: </span>
        <span>LIBRE: </span>
      </li>
      <li>
        <span>Precio (DOLARES): </span>
        <span>35000</span>
      </li>
      <li>
        <span>Condición: </span>
        <span>Anulado</span>
      </li>
    </ul>
  </div>
);

export default PropertyCard;