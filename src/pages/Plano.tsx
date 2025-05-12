"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import Image from "next/image";
import withAuth from '../hoc/WithAuth';
import Header2 from "@/components/common/Header_2";
import map from "../assets/map.png";

const HEADER_HEIGHT = 100; 

const PlanoPage = () => {
  return (
    <div
      className="bg-white"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Header2 />
      <main
        style={{
          position: "absolute",
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          src={map}
          alt="map"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </main>
    </div>
  );
};

export default withAuth(PlanoPage);