import styles from '../../app/config/theme/Card.module.css';

interface Customer {
  name?: string;
  phone?: string;
  ci?: string;
}

interface AdjudicatorCardProps {
  onAddClick: () => void;
  customer?: Customer | null;
  allowAdd?: boolean;
}

const AdjudicatorCard: React.FC<AdjudicatorCardProps> = ({ onAddClick, customer }) => (
  <div className={styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Adjudicatario</span>
    </div>
    
    {customer ? (
      <div className="space-y-2">
        <p><span className="font-semibold">Nombre:</span> {customer.name}</p>
        <p><span className="font-semibold">CI:</span> {customer.ci}</p>
        <p><span className="font-semibold">Teléfono:</span> {customer.phone}</p>
      </div>
    ) : (
      <>
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
      </>
    )}
  </div>
);

export default AdjudicatorCard;