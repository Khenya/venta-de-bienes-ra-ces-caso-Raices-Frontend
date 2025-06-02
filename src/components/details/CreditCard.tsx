'use client';

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Spinner from 'react-bootstrap/Spinner';
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
}

interface JwtPayload {
  role: string;
}

const CreditCard: React.FC<CreditCardProps> = ({
  propertyId,
  onInstallmentClick
}) => {
  const [installments, setInstallments] = useState<Installment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setRole(decoded.role);
    }
  }, []);

  useEffect(() => {
    fetchInstallments();
  }, [propertyId]);

  const fetchInstallments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/installments/property/${propertyId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setInstallments(data.installments || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching installments:', err);
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/installments/pay/${installmentId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'No se pudo registrar el pago');
      }

      showSuccess('Pago registrado exitosamente');
      fetchInstallments();
    } catch (err) {
      console.error('Error al pagar:', err);
      setError(err instanceof Error ? err.message : 'Hubo un error al registrar el pago');
    }
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <Spinner animation="border" role="status" style={{ color: '#000' }}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (installments.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.propertyCardHeader}>
          <span className={styles.propertyCardTitle}>Plan de Pagos</span>
        </div>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>No se encontraron pagos para esta propiedad.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.propertyCardHeader}>
        <span className={styles.propertyCardTitle}>Plan de Pagos</span>
        <small style={{ color: Colors.text_color, opacity: 0.7 }}>
          {installments.length} cuotas
        </small>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {error && (
          <div className="alert alert-danger" style={{ margin: 0 }}>
            {error}
            <button
              type="button"
              className="btn-close"
              style={{ float: 'right' }}
              onClick={() => setError(null)}
            />
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success" style={{ margin: 0 }}>
            {successMessage}
            <button
              type="button"
              className="btn-close"
              style={{ float: 'right' }}
              onClick={() => setSuccessMessage(null)}
            />
          </div>
        )}
      </div>

      <div className="table-responsive">
        <table className="table table-sm table-hover">
          <thead className="table-light">
            <tr>
              <th>Monto</th>
              <th>Mora</th>
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
                <td>{formatCurrency(installment.amount)}</td>
                <td>
                  {installment.interest && parseFloat(installment.interest) > 0
                    ? formatCurrency(parseFloat(installment.interest))
                    : '0'
                  }
                </td>
                <td><small>{formatDate(installment.payment_date)}</small></td>
                <td><small>{installment.paid_date ? formatDate(installment.paid_date) : '-'}</small></td>
                <td>
                  <span>
                    {installment.status.charAt(0).toUpperCase() + installment.status.slice(1)}
                  </span>
                </td>
                {role === "admin" && (
                  <td>
                    {installment.status !== 'pagada' && (
                      <button
                        className="btn btn-sm"
                        style={{
                          backgroundColor: Colors.text_color,
                          color: '#fff',
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
    </div>
  );
};

export default CreditCard;