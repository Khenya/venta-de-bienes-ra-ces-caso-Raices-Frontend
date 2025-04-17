import styles from '../../app/config/theme/Card.module.css';
import { RiSendPlane2Line } from "react-icons/ri";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface Observation {
  date: string;
  note: string;
}

interface ObservationsCardProps {
  propertyId: number; 
}

const ObservationsCard: React.FC<ObservationsCardProps> = ({ propertyId }) => {
  const [newObservation, setNewObservation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [role, setRole] = useState<string | null>(null);

  const fetchObservations = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token disponible");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/properties/${propertyId}/observations`,
        {
          headers: {
            "Authorization": token
          },
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Error al cargar observaciones");
      }

      const data = await response.json();
      setObservations(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
      } catch (e) {
        console.error("Error decoding token:", e);
      }
    }
  }, []);
  
  useEffect(() => {
    fetchObservations();
  }, [propertyId]);

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

      await fetchObservations();
      setNewObservation("");
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

      <div className="space-y-4 mt-4">
        {observations.length > 0 ? (
          observations.map((obs, index) => (
            <div key={`${obs.date}-${index}`} className="flex flex-col">
              <p className={styles.observationDate}>
                {new Date(obs.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit'
                })}
              </p>
              <p className="text-sm text-gray-600 mt-1">{obs.note}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 italic text-center mt-2">
            No hay observaciones aún.
          </p>
        )}
      </div>
      {role === 'admin' && (
        <div className={styles.observationInputWrapper}>
          <input
            type="text"
            value={newObservation}
            onChange={(e) => setNewObservation(e.target.value)}
            placeholder="Ingresa una observación"
            className={styles.observationInput}
            onKeyPress={(e) => e.key === 'Enter' && handleSendObservation()}
          />
          <RiSendPlane2Line 
            className={`${styles.observationSendIcon} ${isLoading ? 'disabled' : ''}`}
            onClick={!isLoading ? handleSendObservation : undefined}
          />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default ObservationsCard;