"use client";
import withAuth from '../hoc/WithAuth';
import Header2 from "@/components/common/Header_2";
import { Colors } from "../app/config/theme/Colors"

const PlanoPage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: Colors.primary }}>
      <Header2/>
      <h1 className="text-3xl font-bold">¡Bienvenido a la página de Mapa!</h1>
    </div>
  );
}
export default withAuth(PlanoPage);