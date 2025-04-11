"use client";
import withAuth from '../hoc/WithAuth';

import Header2 from "@/components/common/Header_2";
import PropertyHeader from '@/components/details/PropertyHeader';
import PropertyCard from '@/components/details/PropertyCard';
import AdjudicatorCard from '@/components/details/AdjudicatorCard';
import ObservationsCard from '@/components/details/ObservationsCard';
import styles from '../app/config/theme/PropertyHeader.module.css';

const PropertyPage = () => {
  return (
    <div className="min-h-screen">
      <Header2/>
      <main style={{
        paddingTop: "100px",
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }} className="w-full bg-gray-50">
        <div className="w-full max-w-6xl p-4">
          <PropertyHeader />

          <div className={styles.cardGrid}>
            <PropertyCard />
            <AdjudicatorCard />
            <ObservationsCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(PropertyPage);