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

interface TableProps {
  currentPage: number;
  itemsPerPage: number;
  onTotalItemsChange: (total: number) => void;
}

const Table: React.FC<TableProps> = ({ 
  currentPage, 
  itemsPerPage,
  onTotalItemsChange
}) => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/properties`,
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
        onTotalItemsChange(data.length);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchProperties();
  }, [onTotalItemsChange]);

  // Calcular los items para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
      {error ? (
        <p className="text-red-500 text-center p-4">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#8C756A] text-white">
              <tr>
                <th className="px-4 py-3 text-center font-medium">N°</th>
                <th className="px-4 py-3 text-center font-medium">MANZANO</th>
                <th className="px-4 py-3 text-center font-medium">LOTE</th>
                <th className="px-4 py-3 text-center font-medium">DUEÑO</th>
                <th className="px-4 py-3 text-center font-medium">ESTADO DE PAGO</th>
                <th className="px-4 py-3 text-center font-medium">PRECIO (DOLARES)</th>
                <th className="px-4 py-3 text-center font-medium">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((property, index) => (
                  <TableRow 
                    key={property.property_id} 
                    property={{
                      ...property,
                      property_id: indexOfFirstItem + index + 1
                    }} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No hay propiedades disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;