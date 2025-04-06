import styles from "@/app/config/theme/styles";

import React from "react";

interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner?: string;
  state: string;
  price: number;
}

const TableRow: React.FC<{ property: Property }> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td  style={styles.tableCell}>{property.property_id}</td>
      <td  style={styles.tableCell}>{property.manzano}</td>
      <td  style={styles.tableCell}>{property.batch === "N/A" ? "N/A" : property.batch}</td>
      <td  style={styles.tableCell}>{property.owner || "N/A"}</td>
      <td  style={styles.tableCell}>
        <span className={`px-3 py-1 rounded-full text-xs ${
          property.state === "LIBRE" || property.state === "UBRE" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {property.state}
        </span>
      </td>
      <td  style={styles.tableCell}>${formatPrice(property.price)}</td>
      <td  style={styles.tableCell}>
        <button className="text-blue-600 hover:text-blue-800 underline text-sm">
          Detalle
        </button>
      </td>
    </tr>
  );
};

export default TableRow;