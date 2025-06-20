import withAuth from '../hoc/WithAuth';
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

import Header2 from "@/components/common/Header_2";
import PropertyHeader from '@/components/details/PropertyHeader';
import PropertyCard from '@/components/details/PropertyCard';
import AdjudicatorCard from '@/components/details/AdjudicatorCard';
import ObservationsCard from '@/components/details/ObservationsCard';
import styles from '../app/config/theme/Card.module.css';
import EditPrperty from '@/components/details/EditPropertyModal';
import NewCustomerModal from "@/components/details/NewCustomerModal";
import CreditCard from "@/components/details/CreditCard";

interface Installment {
  installment_id: number;
  credit_id: number;
  amount: number;
  installment_number: number;
  payment_date: string;
  paid_date: string | null;
  interest: string;
  status: 'pagada' | 'vencida' | 'pendiente';
}

const PropertyPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || null;
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInstallment, setSelectedInstallment] = useState<Installment | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Para forzar re-render

  const handleInstallmentClick = (installment: Installment) => {
    setSelectedInstallment(installment);
  };

  const fetchProperty = async () => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/properties/${id}`, {
        headers: {
          Authorization: token
        },
        credentials: "include"
      });

      if (!res.ok) throw new Error("No se pudo obtener la propiedad");
      const data = await res.json();

      const combinedObservations = data.observations && data.observation_dates
        ? [{
          note: data.observations,
          date: data.observation_dates
        }]
        : [];

      const customer = data.customer_name ? {
        name: data.customer_name,
        phone: data.customer_phone,
        ci: data.customer_ci
      } : null;

      setProperty({
        ...data,
        observations: combinedObservations,
        customer,
        testimony_number: data.testimony_numbre
      });
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error al cargar la propiedad");
      console.error("Error fetching property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreditCreated = () => {
    // Incrementar refreshKey para forzar re-render del CreditCard
    setRefreshKey(prev => prev + 1);
    // También podrías recargar la propiedad si es necesario
    // fetchProperty();
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white">
        <Header2 />
        <main
          style={{
            paddingTop: "100px",
            minHeight: "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando propiedad...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-white">
        <Header2 />
        <main
          style={{
            paddingTop: "100px",
            minHeight: "calc(100vh - 80px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="text-center">
            <div className="alert alert-danger">
              <h4>Error</h4>
              <p>{error}</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setError(null);
                  fetchProperty();
                }}
              >
                Reintentar
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header2 />
      <main
        style={{
          paddingTop: "100px",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="w-full bg-gray-50"
      >
        <div className="w-full max-w-6xl p-4">
          {property && <PropertyHeader property={property} />}

          <div className={styles.cardGrid}>
            {property && (
              <>
                <div>
                  <div className="mb-4">
                    <PropertyCard
                      onEditClick={() => setShowEditModal(true)}
                      property={property}
                    />
                  </div>
                  <div>
                    <AdjudicatorCard
                      onAddClick={() => setShowCustomerModal(true)}
                      customer={property.customer}
                    />
                  </div>
                </div>
                <CreditCard
                  key={refreshKey}
                  propertyId={property.property_id}
                  onInstallmentClick={handleInstallmentClick}
                  onCreditCreated={handleCreditCreated}
                />
                <ObservationsCard propertyId={property.property_id} />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Modales */}
      <NewCustomerModal
        isOpen={showCustomerModal}
        onClose={() => {
          setShowCustomerModal(false);
          fetchProperty();
        }}
        onSave={() => {
          setShowCustomerModal(false);
          fetchProperty();
        }}
        propertyId={property?.property_id}
      />

      {property && (
        <EditPrperty
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSave={() => {
            setShowEditModal(false);
            fetchProperty();
          }}
          propertyId={property.property_id}
        />
      )}
    </div>
  );
};

export default withAuth(PropertyPage);