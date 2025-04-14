import styles from '../../app/config/theme/Card.module.css';
import { RiSendPlane2Line } from "react-icons/ri";

interface Observation {
  date: string;
  note: string;
}

interface ObservationsCardProps {
  observations: Observation[];
}

const ObservationsCard: React.FC<ObservationsCardProps> = ({ observations }) => (
  <div className={styles.card}>
    <div className={styles.propertyCardHeader}>
      <span className={styles.propertyCardTitle}>Observaciones</span>
    </div>

    <div>
      {observations && observations.length > 0 ? (
        observations.map((obs: Observation, index: number) => (
          <div key={index} className="bg-gray-50 p-2 rounded mb-2">
            <p className="font-semibold">{obs.date}</p>
            <p>{obs.note}</p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-400 italic text-center mt-2">No hay observaciones aún.</p>
      )}
    </div>

    <div className="w-full relative mt-4 flex">
      <input
        type="text"
        placeholder="Ingresa una observación"
        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <RiSendPlane2Line 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        style={{ fontSize: "18px" }}
      />
    </div>
  </div>
);

export default ObservationsCard;