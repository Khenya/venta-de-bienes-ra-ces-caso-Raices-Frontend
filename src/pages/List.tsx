import Header2 from "@/components/common/Header_2";
import Table from "@/components/list/Table";
import styles from "@/app/config/theme/styles";

import { CiFilter } from "react-icons/ci";
import { RiDownloadLine } from "react-icons/ri";
import { useState } from "react";

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header2 />
      <main style={{ 
        paddingTop: "80px", 
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">          
          <div className="w-full text-center mb-6">
            <h1 className="text-2xl font-bold mx-auto">
              Listado de Inmuebles Nueva Esperanza
            </h1>
          </div>
          <div style={styles.buttonsContainer}>
            <button style={styles.confirmButton}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RiDownloadLine className="text-lg" />
                Descargar
              </span>
            </button>

            <button style={styles.cancelButton}>
              Nuevo inmueble
            </button>

            <button style={styles.cancelButton}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CiFilter className="text-lg" />
                Más filtros
              </span>
            </button>
          </div>
          
          <Table 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage}
            onTotalItemsChange={setTotalItems}
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
    </div>
  );
};

export default List;