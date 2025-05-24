import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import TableRow from "./TableRow";
import styles from "@/app/config/theme/styles";

interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner_names?: string;
  state: string;
  price: number;
}

interface DecodedToken {
  userId: number;
  role: string;
  username: string;
}

interface TableProps {
  currentPage: number;
  itemsPerPage: number;
  onTotalItemsChange: (total: number) => void;
  filter: Record<string, string>;
  properties: Property[];
  setProperties: (props: Property[]) => void;
}

const Table: React.FC<TableProps> = ({
  currentPage,
  itemsPerPage,
  onTotalItemsChange,
  filter,
  properties,
  setProperties
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token disponible. Inicia sesión.");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const isAdmin = decoded.role === "admin";

        const params: Record<string, string> = { ...filter };

        if (!isAdmin) {
          params.owner = decoded.username;
        }

        const queryString = new URLSearchParams(params).toString();
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/properties/filter?${queryString}`;

        const headers = new Headers();
        headers.set("Authorization", token);

        const response = await fetch(url, {
          method: "GET",
          headers,
          credentials: "include",
        });

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
  }, [filter, onTotalItemsChange, setProperties]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
      {error ? (
        <p className="text-red-500 text-center p-4">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table style={styles.table}>
            <thead className="bg-[#8C756A] text-white">
              <tr style={styles.tableHeader}>
                <th style={styles.tableCell}>N°</th>
                <th style={styles.tableCell}>MANZANO</th>
                <th style={styles.tableCell}>LOTE</th>
                <th style={styles.tableCell}>DUEÑO</th>
                <th style={styles.tableCell}>ESTADO DE PAGO</th>
                <th style={styles.tableCell}>PRECIO (USD)</th>
                <th style={styles.tableCell}>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((property: Property, index: number) => (
                  <TableRow
                    key={property.property_id}
                    property={property}
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