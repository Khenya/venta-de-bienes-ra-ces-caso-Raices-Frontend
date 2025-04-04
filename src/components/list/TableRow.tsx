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
      <td className="px-4 py-3 text-center">{property.property_id}</td>
      <td className="px-4 py-3 text-center">{property.manzano}</td>
      <td className="px-4 py-3 text-center">{property.batch === "N/A" ? "N/A" : property.batch}</td>
      <td className="px-4 py-3 text-center">{property.owner || "N/A"}</td>
      <td className="px-4 py-3 text-center">
        <span className={`px-3 py-1 rounded-full text-xs ${
          property.state === "LIBRE" || property.state === "UBRE" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {property.state}
        </span>
      </td>
      <td className="px-4 py-3 text-center font-medium">${formatPrice(property.price)}</td>
      <td className="px-4 py-3 text-center">
        <button className="text-blue-600 hover:text-blue-800 underline text-sm">
          Detalle
        </button>
      </td>
    </tr>
  );
};

export default TableRow;