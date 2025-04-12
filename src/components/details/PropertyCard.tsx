import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";
import { MdModeEditOutline } from "react-icons/md";

interface Property {
  state: string;
  price: number;
}

interface PropertyCardProps {
  onEditClick: () => void;
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ onEditClick, property }) => (
  <div className={styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Detalles del lote</span>
      <button className={styles.propertyCardEditBtn} onClick={onEditClick}>
        <MdModeEditOutline style={{ color: Colors.text_color, fontSize: "24px", cursor: "pointer" }} />
        Editar
      </button>
    </div>
    <ul>
      <li><span>Estado: </span><span>{property.state}</span></li>
      <li><span>Precio (DÓLARES): </span><span>{property.price}</span></li>
    </ul>
  </div>
);

export default PropertyCard;