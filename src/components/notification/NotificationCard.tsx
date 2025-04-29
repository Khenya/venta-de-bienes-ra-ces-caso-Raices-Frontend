import styles from '../../app/config/theme/NotificationCard.module.css';

interface NotificationCardProps {
  manzano: number;
  batch: number;
  state: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ manzano, batch, state }) => {
  return (
    <div className={styles.notificationCard}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p className={styles.text}>
          El manzano {manzano} lote {batch} cambió de estado a <span className={styles.new}>{state}</span>
        </p>
      </div>
      <hr className={styles.separator} />
    </div>
  );
};

export default NotificationCard ;