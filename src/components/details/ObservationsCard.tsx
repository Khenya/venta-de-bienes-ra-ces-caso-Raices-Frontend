import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";

import { RiSendPlane2Line } from "react-icons/ri";

const ObservationsCard = () => (
  <div className= {styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Observaciones</span>
    </div>
    <div>
      <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
        <span>13/11/2023</span>
        <span>Anulado</span>
      </div>
      <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
        <span>06/04/2023</span>
        <span>Anulado</span>
      </div>
    </div>
    <div>
      <input
        type="text"
        placeholder="Ingrese una observación"
        className={styles.propertyCardEditBtn}
      />
      <RiSendPlane2Line style={{ color: Colors.text_color, fontSize: "16px" }} />
    </div>
  </div>
);

export default ObservationsCard;
 