import styles from "@/app/config/theme/styles";

import React from "react";

interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner_names?: string;
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

  const allOwners = [
    "German Choque Ramos",
    "Aydee Mercedes Choque de Alvarado",
    "Nancy Lidia Choque Ramos",
    "Jose Luis Choque Ramos",
    "Javier Yason Choque Ramos"
  ].sort().join(', ');

  const checkAllOwners = (owners: string) => {
    if (!owners) return false;
    const ownerList = owners.split(', ').sort().join(', ');
    return ownerList === allOwners;
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      <td  style={styles.tableCell}>{property.property_id}</td>
      <td  style={styles.tableCell}>{property.manzano}</td>
      <td  style={styles.tableCell}>{property.batch}</td>
      <td style={styles.tableCell}>
        {property.owner_names && checkAllOwners(property.owner_names) 
          ? "TODOS" 
          : property.owner_names || "N/A"}
      </td>
      <td  style={styles.tableCell}>{property.state}</td>
      <td  style={styles.tableCell}>${formatPrice(property.price)}</td>
      <td  style={styles.tableCell}>
         <a 
            href="/PropertyPage" 
            className="text-blue-600 hover:text-blue-800 underline text-sm"
          >
            Detalle
          </a>
      </td>
    </tr>
  );
};

export default TableRow;