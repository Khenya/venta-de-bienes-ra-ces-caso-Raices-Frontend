'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Colors } from '@/app/config/theme/Colors';

interface NewCreditModalProps {
  propertyId: number;// Asegúrate que esto sea number
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const NewCreditModal: React.FC<NewCreditModalProps> = ({
  propertyId,  // Recibimos customerId como prop
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    totalAmount: 12000,
    interestNumber: 5,
    installmentsCount: 12,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token de autenticación');

      const payload = {
        totalAmount: Number(formData.totalAmount),
        interestNumber: Number(formData.interestNumber),
        installmentsCount: Number(formData.installmentsCount),
        propertyId: Number(propertyId)// Conversión explícita
      };

      console.log('Payload completo:', payload);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/credits`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Crédito creado:', response.data);
      onClose();
      onSuccess?.();
    } catch (err: any) {
      console.error('Error completo:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      setError(err.response?.data?.error || err.message || 'Error al crear el crédito');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient || !isOpen) return null;

  return (
    <div className="modal d-flex align-items-center justify-content-center show" style={{ display: "flex", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
            <h5 className="modal-title" style={{ color: Colors.text_color }}>
              Crear Nuevo Crédito
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger">
                  {error}
                  <button
                    type="button"
                    className="btn-close float-end"
                    onClick={() => setError(null)}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Monto Total ($)*</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderColor: Colors.text_color }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Tasa de Interés (%)*</label>
                <input
                  type="number"
                  name="interestNumber"
                  value={formData.interestNumber}
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderColor: Colors.text_color }}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: Colors.text_color }}>Número de Cuotas*</label>
                <input
                  type="number"
                  name="installmentsCount"
                  value={formData.installmentsCount}
                  onChange={handleChange}
                  className="form-control"
                  style={{ borderColor: Colors.text_color }}
                  required
                />
              </div>

              <div className="text-muted small">
                <p>Property ID: {propertyId} (Tipo: {typeof propertyId})</p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: Colors.text_color,
                  color: Colors.primary,
                  border: 'none'
                }}
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Crédito'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCreditModal;