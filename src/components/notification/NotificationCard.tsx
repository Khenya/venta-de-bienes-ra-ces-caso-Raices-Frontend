import styles from '../../app/config/theme/NotificationCard.module.css';

interface NotificationCard  {
  manzano: number;
  batch: number;
  lastState: string;
  newState: string;
}

const NotificationCard: React.FC<NotificationCard > = ({ manzano, batch, lastState, newState }) => {
  return (
    <div className={styles.notificationCard}>
      <p className={styles.text}>
        El manzano {manzano} lote {batch} cambio de estado
      </p>
      <p className={styles.stateChange}>
        de <span className={styles.last}>{lastState}</span> a <span className={styles.new}>{newState}</span>
      </p>
      <hr className={styles.separator} />
    </div>
  );
};

export default NotificationCard ;