import styles from '../../app/config/theme/Card.module.css';
import { RiSendPlane2Line } from "react-icons/ri";
import { useState } from "react";

interface Observation {
  date: string;
  note: string;
}

interface ObservationsCardProps {
  observations: Observation[];
  propertyId: number; // Añadir propertyId como prop
}

const ObservationsCard: React.FC<ObservationsCardProps> = ({ observations, propertyId }) => {
  const [newObservation, setNewObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentObservations, setCurrentObservations] = useState<Observation[]>(observations || []);

  const handleSendObservation = async () => {
    if (!newObservation.trim()) {
      setError("La observación no puede estar vacía");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/observation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        credentials: "include",
        body: JSON.stringify({
          property_id: propertyId,
          observacion: newObservation
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al enviar observación");
      }

      const data = await response.json();
      
      // Agregar la nueva observación al estado local
      setCurrentObservations(prev => [
        ...prev,
        {
          date: new Date(data.observation.date).toLocaleDateString(),
          note: data.observation.observacion
        }
      ]);

      setNewObservation(""); // Limpiar el input
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.propertyCardHeader}>
        <span className={styles.propertyCardTitle}>Observaciones</span>
      </div>

      <div>
        {currentObservations.length > 0 ? (
          currentObservations.map((obs: Observation, index: number) => (
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
          value={newObservation}
          onChange={(e) => setNewObservation(e.target.value)}
          placeholder="Ingresa una observación"
          className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && handleSendObservation()}
        />
        <RiSendPlane2Line 
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${isLoading ? "text-gray-300" : "text-gray-400 cursor-pointer"}`}
          style={{ fontSize: "18px" }}
          onClick={!isLoading ? handleSendObservation : undefined}
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default ObservationsCard;