import React from "react";

interface Property {
  property_id: number;
  manzano: string;
  batch: string;
  owner?: string;
  state: string;
  price: number;
}

interface TableRowProps {
  property: Property;
}

const TableRow: React.FC<TableRowProps> = ({ property }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-4 py-3">{property.property_id}</td>
      <td className="px-4 py-3">{property.manzano}</td>
      <td className="px-4 py-3">{property.batch}</td>
      <td className="px-4 py-3">{property.owner || "N/A"}</td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs ${
          property.state === "UBRE" 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {property.state}
        </span>
      </td>
      <td className="px-4 py-3">${property.price.toLocaleString()}</td>
      <td className="px-4 py-3">
        <button className="text-blue-500 hover:text-blue-700 underline">
          Detalle
        </button>
      </td>
    </tr>
  );
};

export default TableRow;