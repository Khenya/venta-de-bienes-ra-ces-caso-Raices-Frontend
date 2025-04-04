import Header2 from "@/components/common/Header_2";
import Table from "@/components/list/Table";
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
          
          <div className="flex justify-center gap-4 mb-6">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Descargar
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Nuevo inmueble
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
              Más filtros
            </button>
          </div>
          
          <Table 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage}
            onTotalItemsChange={setTotalItems}
          />

          <div className="flex justify-center mt-6 gap-4">
            <button 
              className={`px-4 py-2 border rounded ${
                currentPage === 1 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span className="flex items-center px-4">
              {currentPage} / {totalPages}
            </span>
            <button 
              className={`px-4 py-2 border rounded ${
                currentPage >= totalPages 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "hover:bg-gray-100"
              }`}
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