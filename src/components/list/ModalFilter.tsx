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
  onApplyFilter: (filter: { field: string; value: string }) => void;
}

const ModalFilter: React.FC<ModalFilterProps> = ({ isOpen, onClose, onSave, onApplyFilter }) => {
  const [selectedField, setSelectedField] = useState<string>("ESTADO");
  const [ownerOption, setOwnerOption] = useState<string>("Aydee Choque");
  const [textValue, setTextValue] = useState<string>("");
  const [stateOption, setStateOption] = useState<string>("LIBRE");
  const [isAdmin, setIsAdmin] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwtDecode(token);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const filterValue = selectedField === "DUEÑO"
      ? ownerOption
      : selectedField === "ESTADO"
        ? stateOption
        : textValue;

    onApplyFilter({ field: selectedField, value: filterValue });
    onSave();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered className="mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>Filtros</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Form.Group className="mb-3">
              <Form.Label style={{ color: Colors.text_color }}>Seleccione el campo para el filtro*</Form.Label>
              <Form.Select
                style={{ borderColor: Colors.text_color }}
                value={selectedField}
                onChange={(e) => {
                  const field = e.target.value;
                  setSelectedField(field);
                  setTextValue("");
                  setOwnerOption("Aydee Choque");
                  setStateOption("LIBRE");
                }}
                required
              >
                <option value="ESTADO">ESTADO</option>
                {isAdmin && <option value="DUEÑO">DUEÑO</option>}
                <option value="PRECIO">PRECIO (USD)</option>
                <option value="MANZANO">MANZANO</option>
                <option value="LOTE">LOTE</option>
              </Form.Select>
            </Form.Group>

            {selectedField === "ESTADO" && (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: Colors.text_color }}>Seleccione un estado:</Form.Label>
                <Form.Select
                  style={{ borderColor: Colors.text_color }}
                  value={stateOption}
                  onChange={(e) => setStateOption(e.target.value)}
                  required
                >
                  <option value="LIBRE">LIBRE</option>
                  <option value="CANCELADO">CANCELADO</option>
                  <option value="RESERVADO">RESERVADO</option>
                  <option value="RETRASADO">RETRASADO</option>
                  <option value="PAGANDO">PAGANDO</option>
                  <option value="CADUCADO">CADUCADO</option>
                </Form.Select>
              </Form.Group>
            )}

            {selectedField === "DUEÑO" && isAdmin && (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: Colors.text_color }}>Seleccione un dueño:</Form.Label>
                <Form.Select
                  style={{ borderColor: Colors.text_color }}
                  value={ownerOption}
                  onChange={(e) => setOwnerOption(e.target.value)}
                  required
                >
                  <option value="Aydee Choque">Aydee Choque</option>
                  <option value="German Choque">German Choque</option>
                  <option value="Nancy Choque">Nancy Choque</option>
                  <option value="Jose Choque">Jose Choque</option>
                  <option value="Javier Choque">Javier Choque</option>
                </Form.Select>
              </Form.Group>
            )}

            {(selectedField === "PRECIO" || selectedField === "MANZANO" || selectedField === "LOTE") && (
              <Form.Group className="mb-3">
                <Form.Label style={{ color: Colors.text_color }}>Ingrese el valor:</Form.Label>
                <Form.Control
                  type="number"
                  style={{ borderColor: Colors.text_color }}
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  required
                />
              </Form.Group>
            )}
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
              Guardar
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFilter;