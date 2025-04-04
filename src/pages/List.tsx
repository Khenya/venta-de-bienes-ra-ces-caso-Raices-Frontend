import Header2 from "@/components/common/Header_2";
import Table from "@/components/list/Table";

const List = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header2 />
      <main style={{ 
        paddingTop: "80px", 
        minHeight: "calc(100vh - 80px)"
      }}>
        <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mx-auto">
            Listado de Inmuebles Nueva Esperanza
          </h1>
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
          
          <Table />

          <div className="flex justify-center mt-6 gap-4">
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Anterior
            </button>
            <button className="px-4 py-2 border rounded hover:bg-gray-100">
              Siguiente
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default List;