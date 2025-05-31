'use client';

import React, { useState, useEffect, FormEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Colors } from "@/app/config/theme/Colors";

interface ModalFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onApplyFilter: (filters: Record<string, string>) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isOpen, onClose, onSave, onApplyFilter }) => {
  const [ownerOption, setOwnerOption] = useState<string>("");
  const [stateOption, setStateOption] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [manzano, setManzano] = useState<string>("");
  const [batch, setBatch] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filters: Record<string, string> = {};

    if (ownerOption) filters.owner = ownerOption;
    if (stateOption) filters.state = stateOption;
    if (price) filters.price = price;
    if (manzano) filters.manzano = manzano;
    if (batch) filters.batch = batch;

    onApplyFilter(filters);
    onSave();

    setOwnerOption("");
    setStateOption("");
    setPrice("");
    setManzano("");
    setBatch("");

    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered className="mt-5">
      <Form onSubmit={handleSubmit}>
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>Filtros</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Form.Group className="mb-3">
              <Form.Label style={{ color: Colors.text_color }}>Estado</Form.Label>
              <Form.Select
                style={{ borderColor: Colors.text_color }}
                value={stateOption}
                onChange={(e) => setStateOption(e.target.value)}
              >
                <option value="">-- Sin filtro --</option>
                <option value="LIBRE">LIBRE</option>
                <option value="CANCELADO">CANCELADO</option>
                <option value="RESERVADO">RESERVADO</option>
                <option value="RETRASADO">RETRASADO</option>
                <option value="LIQUIDANDO">LIQUIDANDO</option>
                <option value="CADUCADO">CADUCADO</option>
                <option value="RESERVADO">RESERVADO</option>
                <option value="ALQUILADO">ALQUILADO</option>
              </Form.Select>
            </Form.Group>

            {isAdmin && (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: Colors.text_color }}>Dueño</Form.Label>
                <Form.Select
                  style={{ borderColor: Colors.text_color }}
                  value={ownerOption}
                  onChange={(e) => setOwnerOption(e.target.value)}
                >
                  <option value="">-- Sin filtro --</option>
                  <option value="Aydee Choque">Aydee Choque</option>
                  <option value="German Choque">German Choque</option>
                  <option value="Nancy Choque">Nancy Choque</option>
                  <option value="Jose Choque">Jose Choque</option>
                  <option value="Javier Choque">Javier Choque</option>
                </Form.Select>
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label style={{ color: Colors.text_color }}>Precio (USD)</Form.Label>
              <Form.Control
                type="number"
                style={{ borderColor: Colors.text_color }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6 mb-3">

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: Colors.text_color }}>Manzano</Form.Label>
                  <Form.Control
                    type="number"
                    style={{ borderColor: Colors.text_color }}
                    value={manzano}
                    onChange={(e) => setManzano(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: Colors.text_color }}>Lote</Form.Label>
                  <Form.Control
                    type="number"
                    style={{ borderColor: Colors.text_color }}
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <Button
              type="button"
              variant="outline-secondary"
              onClick={onClose}
              style={{ borderColor: Colors.text_color, color: Colors.text_color }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              style={{ backgroundColor: Colors.text_color, color: Colors.primary }}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFilter;