"use client";
import withAuth from '../hoc/WithAuth';
import Header2 from "@/components/common/Header_2";

const PlanoPage = () => {
  return (
    <div className="min-h-screen">
      <Header2/>
      <main style={{ 
        paddingTop: "80px", 
        minHeight: "calc(100vh - 80px)"
      }}>
        <h1 className="text-3xl font-bold text-center">
          ¡Bienvenido a la página de Detalle!
        </h1>
      </main>
    </div>
  );
};

export default withAuth(PlanoPage);