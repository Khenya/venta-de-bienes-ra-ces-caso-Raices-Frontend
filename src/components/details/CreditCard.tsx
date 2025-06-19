'use client';

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import api from '@/utils/api';

import styles from '../../app/config/theme/Card.module.css';
import { Colors } from "@/app/config/theme/Colors";

export interface Installment {
  installment_id: number;
  credit_id: number;
  amount: number;
  installment_number: number;
  payment_date: string;
  paid_date: string | null;
  interest: string;
  status: 'pagada' | 'vencida' | 'pendiente';
}

interface CreditCardProps {
  propertyId: number;
  onInstallmentClick?: (installment: Installment) => void;
  onCreditCreated?: () => void;
}

interface JwtPayload {
  role: string;
}

const NewCreditModal = ({
  propertyId,
  isOpen,
  onClose,
  onSuccess,
}: {
  propertyId: number;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) => {
  const [formData, setFormData] = useState({
    totalAmount: 0,
    interestNumber: 0,
    installmentsCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        propertyId: Number(propertyId)
      };

      console.log('Creando crédito con payload:', payload);

      await api.post('/api/credits', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({
        totalAmount: 0,
        interestNumber: 0,
        installmentsCount: 0
      });

      onSuccess?.();
      onClose();
    } catch (err: any) {
      console.error('Error al crear crédito:', err);
      setError(err.response?.data?.message || err.message || 'Error al crear el crédito');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton style={{ borderBottom: `2px solid ${Colors.text_color}` }}>
        <Modal.Title style={{ color: Colors.text_color }}>Crear Nuevo Crédito</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
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

          <Form.Group className="mb-3">
            <Form.Label style={{ color: Colors.text_color }}>Monto Total ($)*</Form.Label>
            <Form.Control
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              style={{ borderColor: Colors.text_color }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: Colors.text_color }}>Tasa de Interés (%)*</Form.Label>
            <Form.Control
              type="number"
              name="interestNumber"
              value={formData.interestNumber}
              onChange={handleChange}
              style={{ borderColor: Colors.text_color }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: Colors.text_color }}>Número de Cuotas*</Form.Label>
            <Form.Control
              type="number"
              name="installmentsCount"
              value={formData.installmentsCount}
              onChange={handleChange}
              style={{ borderColor: Colors.text_color }}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: Colors.text_color,
              borderColor: Colors.text_color,
              color: Colors.primary
            }}
          >
            {loading ? 'Creando...' : 'Crear Crédito'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

const CreditCard: React.FC<CreditCardProps> = ({
  propertyId,
  onInstallmentClick,
  onCreditCreated
}) => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasCredit, setHasCredit] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setRole(decoded.role);
    }
    fetchInstallments();
  }, [propertyId]);

  const fetchInstallments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/installments/property/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      const installmentsData = data.installments || [];
      setInstallments(installmentsData);
      setHasCredit(installmentsData.length > 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setHasCredit(false);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handlePayInstallment = async (installmentId: number) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token no disponible');

      const response = await api.put(`/api/installments/pay/${installmentId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status !== 200) {
        throw new Error('No se pudo registrar el pago');
      }

      fetchInstallments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hubo un error al registrar el pago');
    }
  };

  const handleCreditCreated = () => {
    fetchInstallments(); 
    onCreditCreated?.(); 
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.propertyCardHeader}>
          <span className={styles.propertyCardTitle}>Plan de Pagos</span>
        </div>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spinner animation="border" role="status" style={{ color: Colors.primary }}>
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.propertyCardHeader}>
        <span className={styles.propertyCardTitle}>Plan de Pagos</span>
        {hasCredit && (
          <small style={{ color: Colors.text_color, opacity: 0.7 }}>
            {installments.length} cuotas
          </small>
        )}
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          />
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}

      {!hasCredit ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Button
            onClick={() => setIsModalOpen(true)}
            style={{
              marginBottom: '20px',
              backgroundColor: Colors.text_color,
              borderColor: Colors.text_color,
              color: Colors.primary
            }}
          >
            Nuevo Crédito
          </Button>
          <p>
            No se encontró ningún crédito para esta propiedad.
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-sm table-hover">
            <thead className="table-light">
              <tr>
                <th>Cuota</th>
                <th>Monto</th>
                <th>Interés</th>
                <th>Fecha de pago</th>
                <th>Fecha pagada</th>
                <th>Estado</th>
                {role === "admin" && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {installments.map((installment) => (
                <tr
                  key={installment.installment_id}
                  style={{
                    cursor: onInstallmentClick ? 'pointer' : 'default'
                  }}
                  onClick={() => onInstallmentClick && onInstallmentClick(installment)}
                >
                  <td>#{installment.installment_number}</td>
                  <td>{formatCurrency(installment.amount)}</td>
                  <td>
                    {installment.interest && parseFloat(installment.interest) > 0
                      ? formatCurrency(parseFloat(installment.interest))
                      : '$0'
                    }
                  </td>
                  <td><small>{formatDate(installment.payment_date)}</small></td>
                  <td><small>{installment.paid_date ? formatDate(installment.paid_date) : '-'}</small></td>
                  <td>
                    <span style={{ fontWeight: 600, color: Colors.text_color }}>
                      {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td>
                      {installment.status !== 'pagada' && (
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: Colors.brown,
                            color: Colors.primary,
                            border: 'none'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePayInstallment(installment.installment_id);
                          }}
                        >
                          Pagar
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <NewCreditModal
        propertyId={propertyId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleCreditCreated}
      />
    </div>
  );
};

export default CreditCard;