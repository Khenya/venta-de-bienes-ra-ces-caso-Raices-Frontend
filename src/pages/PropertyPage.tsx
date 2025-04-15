import withAuth from '../hoc/WithAuth';
import { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";

import Header2 from "@/components/common/Header_2";
import PropertyHeader from '@/components/details/PropertyHeader';
import PropertyCard from '@/components/details/PropertyCard';
import AdjudicatorCard from '@/components/details/AdjudicatorCard';
import ObservationsCard from '@/components/details/ObservationsCard';
import styles from '../app/config/theme/PropertyHeader.module.css';
import EditPrperty from '@/components/details/EditPropertyModal';
import NewCustomerModal from "@/components/details/NewCustomerModal";

const PropertyPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id") || null;
  const [property, setProperty] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchProperty = async () => {
    if (!id) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No hay token");
      return;
    }

    try {
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
        customer
      });
    } catch (err: any) {
      setError(err.message || "Error al cargar la propiedad");
      console.error("Error fetching property:", err);
  } finally {
    setIsLoading(false);
  }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  return (
    <div className="min-h-screen">
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
                <PropertyCard 
                  onEditClick={() => setShowEditModal(true)} 
                  property={property} 
                />
                <AdjudicatorCard 
                  onAddClick={() => setShowCustomerModal(true)} 
                  customer={property.customer} 
                />
                <ObservationsCard 
                  observations={property.observations} 
                  propertyId={property.property_id} 
                />
              </>
            )}
          </div>
        </div>
      </main>

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