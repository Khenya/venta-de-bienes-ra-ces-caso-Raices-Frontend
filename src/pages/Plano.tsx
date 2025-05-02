"use client";
import Image from "next/image";

import withAuth from '../hoc/WithAuth';
import Header2 from "@/components/common/Header_2";
import map from "../assets/map.png";

const PlanoPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header2 />
      <main
        style={{
          paddingTop: "90px",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ maxWidth: "100%", padding: "0 1rem" }}>
          <Image
            src={map}
            alt="map"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default withAuth(PlanoPage);