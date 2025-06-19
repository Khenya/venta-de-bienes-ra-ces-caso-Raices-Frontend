"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

import Image from "next/image";
import withAuth from '../hoc/WithAuth';
import Header2 from "@/components/common/Header_2";
import styles from "@/app/config/theme/styles";
import api from "@/utils/api";

import { CiSquarePlus } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";

const HEADER_HEIGHT = 100;

const PlanoPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [maps, setMaps] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMaps = async (page: number) => {
    try {
      const res = await api.get(`/api/upload/maps?page=${page}`);
      setMaps(res.data.maps);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setStatusMsg("Error al cargar mapas");
    }
  };

  useEffect(() => {
    fetchMaps(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setStatusMsg("Solo se permiten archivos PNG o JPG");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    try {
      const res = await api.post(`/api/upload/map`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setStatusMsg("Mapa subido exitosamente");
        fetchMaps(currentPage);
      } else {
        setStatusMsg("Error al subir el archivo");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      setStatusMsg("Error al subir el archivo");
    }

    setTimeout(() => setStatusMsg(null), 3000);
  };

  return (
    <div className="bg-white" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      <Header2 />
      <main
        style={{
          position: "fixed",
          top: `${HEADER_HEIGHT}px`,
          left: 0,
          width: "100%",
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center", 
          paddingBottom: "80px", 
        }}
      >
        {maps.length > 0 ? (
          <Image
            src={maps[0]}
            alt="map"
            style={{
              maxWidth: "90%",
              maxHeight: "calc(100% - 80px)",
              objectFit: "contain"
            }}
            width={1920}
            height={1080}
          />
        ) : (
          <p className="text-muted">No hay mapas disponibles</p>
        )}

        {isAdmin && (
          <>
            <div
              onClick={handleIconClick}
              style={{
                position: "absolute",
                bottom: "24px",
                right: "24px",
                color: "#8C756A",
                cursor: "pointer",
                fontSize: "2rem",
              }}
            >
              <CiSquarePlus />
            </div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div
              style={{
                ...styles.buttonsContainerNext,
                position: "absolute",
                bottom: "24px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <button
                style={currentPage === 1 ? styles.paginationButtonDisabled : styles.paginationButton}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <span style={styles.paginationCurrent}>
                {currentPage} / {totalPages}
              </span>

              <button
                style={currentPage >= totalPages ? styles.paginationButtonDisabled : styles.paginationButton}
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= totalPages}
              >
                Siguiente
              </button>
            </div>
          </>
        )}

        {statusMsg && (
          <div
            className="alert alert-info position-absolute"
            style={{ bottom: 80, right: 20 }}
          >
            {statusMsg}
          </div>
        )}
      </main>
    </div>
  );
};

export default withAuth(PlanoPage);