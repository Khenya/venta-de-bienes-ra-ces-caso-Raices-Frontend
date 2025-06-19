'use client';

import React, { useState, FormEvent, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import api from "@/utils/api"; // ✅ Cliente axios centralizado
import { Colors } from "@/app/config/theme/Colors";

interface NewCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  propertyId: number;
}

const NewCustomerModal: React.FC<NewCustomerModalProps> = ({
  isOpen,
  onClose,
  onSave,
  propertyId
}) => {
  const [name, setName] = useState("");
  const [ci, setCi] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!ci || !name) {
      setError("CI y Nombre son campos obligatorios");
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) {
      setError("No hay token de autenticación");
      return;
    }

    const requestData = {
      ci: ci.trim(),
      name: name.trim(),
      phone: phone.trim() || null,
      property_id: propertyId
    };

    try {
      await api.post("/api/protected/customer", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      onSave();
      onClose();
    } catch (error: any) {
      console.error("Error al crear cliente:", error);
      setError(
        error.response?.data?.message ||
        "Error al guardar el cliente. Por favor intente nuevamente."
      );
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="modal d-flex align-items-center justify-content-center show" style={{ display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>Agregar un nuevo adjudicatario</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger">
                  {error}
                  <button type="button" className="btn-close float-end" onClick={() => setError("")}></button>
                </div>
              )}

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Nombre*</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ borderColor: Colors.text_color }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>CI*</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderColor: Colors.text_color }}
                    value={ci}
                    onChange={(e) => setCi(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Celular</label>
                  <input
                    type="number"
                    className="form-control"
                    style={{ borderColor: Colors.text_color }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: Colors.text_color,
                  color: Colors.primary,
                  opacity: !ci || !name ? 0.6 : 1,
                  cursor: !ci || !name ? "not-allowed" : "pointer"
                }}
                disabled={!ci || !name}
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

export default NewCustomerModal;