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
        <button 
          onClick={onAddClick}
          className="bg-[#8C756A] hover:bg-[#6B5D53] text-white px-6 py-2 rounded-md text-sm transition-colors duration-200"
        >
          Agregar un adjudicatario
        </button>
        <p className="mt-3 text-xs text-gray-500 italic">
          Para agregar un adjudicatario debes cambiar el estado a "RESERVADO" o "CANCELADO"
        </p>
      </>
    )}
  </div>
);

export default AdjudicatorCard;