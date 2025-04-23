import styles from '../../app/config/theme/NotificationCard.module.css';

interface NotificationCard  {
  manzano: number;
  batch: number;
  state: string;
}

const NotificationCard: React.FC<NotificationCard > = ({ manzano, batch, state }) => {
  return (
    <div className={styles.notificationCard}>
      <p className={styles.text}>
        El manzano {manzano} lote {batch} cambio de estado a <span className={styles.new}>{state}</span>
      </p>
      <hr className={styles.separator} />
    </div>
  );
};

export default NotificationCard ;