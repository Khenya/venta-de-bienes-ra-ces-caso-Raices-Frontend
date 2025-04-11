import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";

const AdjudicatorCard = () => (
  <div className= {styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Adjudicatario</span>
    </div>
    <button className="bg-[#8C756A] hover:bg-[#6B5D53] text-white px-6 py-2 rounded-md text-sm transition-colors duration-200">
      Agregar un adjudicatario
    </button>
    <p className="mt-3 text-xs text-gray-500 italic">
      Para agregar un adjudicatario debes cambiar el estado a "RESERVADO" o "CANCELADO"
    </p>
  </div>
);

export default AdjudicatorCard; 