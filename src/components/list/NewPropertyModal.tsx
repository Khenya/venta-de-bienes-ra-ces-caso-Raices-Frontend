'use client';

import React, { useState, useEffect, FormEvent } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from "@/app/config/theme/Colors";
import api from '@/utils/api';

interface NewPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

interface Owner {
  fullName: string;
  displayName: string;
}

const NewPropertyModal: React.FC<NewPropertyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [state, setState] = useState("LIBRE");
  const [batch, setBatch] = useState<number | "">("");
  const [manzano, setManzano] = useState<number | "">("");
  const [location, setLocation] = useState("");
  const [meters, setMeters] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [folioNumber, setFolioNumber] = useState<number | "">("");
  const [propertyNumber, setPropertyNumber] = useState<number | "">("");
  const [testimonyNumber, setTestimonyNumber] = useState("");
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  const owners: Owner[] = [
    { fullName: "German Choque", displayName: "German Choque" },
    { fullName: "Aydee Choque", displayName: "Aydee Choque" },
    { fullName: "Nancy Choque", displayName: "Nancy Choque" },
    { fullName: "Jose Choque", displayName: "Jose Choque" },
    { fullName: "Javier Choque", displayName: "Javier Choque" }
  ];

  const resetForm = () => {
    setState("LIBRE");
    setBatch("");
    setManzano("");
    setLocation("");
    setMeters("");
    setPrice("");
    setFolioNumber("");
    setPropertyNumber("");
    setTestimonyNumber("");
    setSelectedOwners([]);
  };

  const isFormValid = () =>
    selectedOwners.length > 0 &&
    batch !== "" &&
    manzano !== "" &&
    location &&
    meters !== "" &&
    price !== "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
    if (!token) return;

    const allOwnerNames = owners.map(o => o.fullName);
    const resolvedOwners = selectedOwners.includes("TODOS") ? allOwnerNames : selectedOwners;

    const requestData = {
      state,
      owner_names: resolvedOwners,
      batch: Number(batch),
      manzano: Number(manzano),
      location,
      meters: Number(meters),
      price: Number(price),
      folio_number: folioNumber || null,
      property_number: propertyNumber || null,
      testimony_numbre: testimonyNumber || null,
    };

    try {
      await api.post('/api/protected/property', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      onSave();
      onClose();
      resetForm();
    } catch (error: any) {
      console.error("Error al crear propiedad:", error);
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="modal d-flex align-items-center justify-content-center show" style={{ display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>Agregar un nuevo inmueble</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Propietarios*</label>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="owner-TODOS"
                          checked={selectedOwners.length === owners.length}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOwners(owners.map(o => o.fullName));
                            } else {
                              setSelectedOwners([]);
                            }
                          }}
                        />
                        <label className="form-check-label" htmlFor="owner-TODOS">
                          TODOS
                        </label>
                      </div>
                    </div>

                    {owners.map((owner) => (
                      <div className="col-md-4" key={owner.fullName}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`owner-${owner.fullName}`}
                            value={owner.fullName}
                            checked={selectedOwners.includes(owner.fullName)}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedOwners((prev) =>
                                prev.includes(value)
                                  ? prev.filter((v) => v !== value)
                                  : [...prev, value]
                              );
                            }}
                          />
                          <label className="form-check-label" htmlFor={`owner-${owner.fullName}`}>
                            {owner.displayName}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Estado*</label>
                  <select className="form-select border" style={{ borderColor: Colors.text_color }} value={state} onChange={(e) => setState(e.target.value)} required>
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
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Manzano*</label>
                  <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={manzano} onChange={(e) => setManzano(Number(e.target.value))} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Lote*</label>
                  <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={batch} onChange={(e) => setBatch(Number(e.target.value))} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Dirección*</label>
                <input type="text" className="form-control" style={{ borderColor: Colors.text_color }} value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Precio (USD)*</label>
                  <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Metraje (m²)*</label>
                  <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={meters} onChange={(e) => setMeters(Number(e.target.value))} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Número Registró DDRR</label>
                <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={folioNumber} onChange={(e) => setFolioNumber(Number(e.target.value))} />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Número de Inmueble</label>
                  <input type="number" className="form-control" style={{ borderColor: Colors.text_color }} value={propertyNumber} onChange={(e) => setPropertyNumber(Number(e.target.value))} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" style={{ color: Colors.text_color }}>Número de Protocolizacion</label>
                  <input type="text" className="form-control" style={{ borderColor: Colors.text_color }} value={testimonyNumber} onChange={(e) => setTestimonyNumber(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn" style={{ backgroundColor: Colors.text_color, color: Colors.primary }} disabled={!isFormValid()}>
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPropertyModal;