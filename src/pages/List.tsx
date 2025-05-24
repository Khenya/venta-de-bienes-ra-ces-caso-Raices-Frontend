'use client';

import Header2 from "@/components/common/Header_2";
import Table from "@/components/list/Table";
import styles from "@/app/config/theme/styles";
import NewPropertyModal from "../components/list/NewPropertyModal";
import ModalFilter from "../components/list/ModalFilter";
import { Colors } from "@/app/config/theme/Colors";

import { CiFilter } from "react-icons/ci";
import { RiDownloadLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner_names?: string;
  state: string;
  price: number;
}

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [isNewPropertyModalOpen, setIsNewPropertyModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState<Record<string, string>>({});
  const [properties, setProperties] = useState<Property[]>([]);

  const handleSaveProperty = () => {
    setIsNewPropertyModalOpen(false);
  };

  const getUserRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const role = getUserRole();
    if (role === "admin") setIsAdmin(true);
  }, []);

  const exportToExcel = () => {
    const data = properties.map((p, index) => ({
      "#": index + 1,
      "Manzano": p.manzano,
      "Lote": p.batch,
      "Dueño": p.owner_names || "N/A",
      "Estado de Pago": p.state,
      "Precio (USD)": p.price,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Propiedades");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Listado_Inmuebles.xlsx");
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column" style={{ backgroundColor: "#f8f9fa" }}>
      <Header2 />
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-start" style={{ height: 'calc(100vh - 100px)', paddingTop: '24px', overflow: 'auto' }}>
        <div className="w-100" style={{ maxWidth: "1280px", padding: "2rem" }}>
          <div style={styles.buttonsContainer}>
            <h1 style={{ color: Colors.brown }}>
              Listado de Inmuebles Nueva Esperanza
            </h1>
          </div>
          <div style={styles.buttonsContainer}>
            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: Colors.text_color,
                borderColor: Colors.text_color,
                color: Colors.primary
              }}
              onClick={exportToExcel}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RiDownloadLine className="text-lg" />
                Descargar
              </span>
            </button>

            <button
              type="button"
              className="btn"
              style={{
                backgroundColor: Colors.primary,
                borderColor: Colors.text_color,
                color: Colors.text_color
              }}
              onClick={() => setIsFilterModalOpen(true)}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CiFilter className="text-lg" />
                Filtros
              </span>
            </button>

            {isAdmin && (
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: Colors.text_color,
                  borderColor: Colors.text_color,
                  color: Colors.primary
                }}
                onClick={() => setIsNewPropertyModalOpen(true)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiPlus className="text-lg" />
                  Nuevo inmueble
                </span>
              </button>
            )}
          </div>

          <Table
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onTotalItemsChange={setTotalItems}
            filter={filter}
            properties={properties}
            setProperties={setProperties}
          />

          <div style={styles.buttonsContainerNext}>
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
        </div>
      </main>

      <NewPropertyModal
        isOpen={isNewPropertyModalOpen}
        onClose={() => setIsNewPropertyModalOpen(false)}
        onSave={handleSaveProperty}
      />
      <ModalFilter
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onSave={handleSaveProperty}
        onApplyFilter={setFilter}
      />
    </div>
  );
};

export default List;