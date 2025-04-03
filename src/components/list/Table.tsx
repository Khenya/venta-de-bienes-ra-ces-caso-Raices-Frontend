import React, { useEffect, useState } from "react";
import TableRow from "./TableRow";

interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner?: string;
  state: string;
  price: number;
}

const Table = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token disponible. Inicia sesión.");
        return;
      }

      try {
        const headers = new Headers();
        headers.set("Authorization", `${token}`);

        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/api/protected/properties",
          {
            method: "GET",
            headers,
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "No autorizado. Inicia sesión nuevamente."
              : "Error al obtener las propiedades."
          );
        }

        const data: Property[] = await response.json();
        setProperties(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Listado de Inmuebles Nueva Esperanza</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Descargar
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
            Nuevo inmueble
          </button>
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
            Más filtros
          </button>
        </div>
        <p className="text-gray-600">Total consultas: {properties.length}</p>
      </div>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                {[
                  "N°",
                  "MANZANO",
                  "LOTE",
                  "DUEÑO",
                  "ESTADO DE PAGO",
                  "PRECIO (DOLARES)",
                  "ACCIONES",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 border-b"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((property) => (
                  <TableRow key={property.property_id} property={property} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-4 text-gray-500"
                  >
                    No hay propiedades disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button className="mx-2 px-4 py-2 border rounded hover:bg-gray-100">Anterior</button>
        <button className="mx-2 px-4 py-2 border rounded hover:bg-gray-100">Siguiente</button>
      </div>
    </div>
  );
};

export default Table;