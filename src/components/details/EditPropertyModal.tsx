'use client';

import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Colors } from "@/app/config/theme/Colors";

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  propertyId: number;
}

const EditPropertyModal: React.FC<EditPropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
  propertyId
}) => {
  const [state, setState] = useState("LIBRE");
  const [price, setPrice] = useState<number | "">("");
  const [propertyNumber, setPropertyNumber] = useState<number | "">("");
  const [folioNumber, setFolioNumber] = useState<number | "">("");
  const [testimonyNumber, setTestimonyNumber] = useState<string | "">("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return;

    const requestData = {
      state,
      price: price !== "" ? Number(price) : null,
      property_number: propertyNumber !== "" ? Number(propertyNumber) : null,
      folio_number: folioNumber !== "" ? Number(folioNumber) : null,
      testimony_numbre: testimonyNumber || null
    };

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/property/${propertyId}/state`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true,
        }
      );
      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error:", error.response?.data);
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="modal d-flex align-items-center justify-content-center show" style={{ display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>Editar el inmueble</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Estado*</label>
                  <select
                    className="form-select"
                    style={{ borderColor: Colors.text_color }}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <option value="LIBRE">LIBRE</option>
                    <option value="RESERVADO">RESERVADO</option>
                    <option value="RETRASADO">RETRASADO</option>
                    <option value="CANCELADO">CANCELADO</option>
                    <option value="LIQUIDANDO">LIQUIDANDO</option>
                    <option value="CADUCADO">CADUCADO</option>
                    <option value="RESERVADO">RESERVADO</option>
                    <option value="ALQUILADO">ALQUILADO</option>
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Precio (USD)*</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderColor: Colors.text_color }}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>N° DE INMUEBLE</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ borderColor: Colors.text_color }}
                  value={propertyNumber}
                  onChange={(e) => setPropertyNumber(Number(e.target.value))}
                />
              </div>
              <div className="row">

                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>N° Registró DDRR</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderColor: Colors.text_color }}
                    value={folioNumber}
                    onChange={(e) => setFolioNumber(Number(e.target.value))}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Número de Protocolizacion</label>
                  <input
                    type="text"
                    className="form-control"
                    style={{ borderColor: Colors.text_color }}
                    value={testimonyNumber}
                    onChange={(e) => setTestimonyNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{ borderColor: Colors.text_color, color: Colors.text_color }}
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: Colors.text_color, color: Colors.primary }}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;