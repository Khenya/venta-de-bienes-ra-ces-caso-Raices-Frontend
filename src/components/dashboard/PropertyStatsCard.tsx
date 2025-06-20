'use client';

import React, { useEffect, useState } from 'react';
import api from '@/utils/api';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FaHouseChimney, FaTag, FaSackDollar } from 'react-icons/fa6';
import { PiSealCheckFill } from 'react-icons/pi';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PropertyCountData {
  total: string;
  libres: string;
  liquidando: string;
  cancelado: string;
}

const iconStyle = { fontSize: '2rem', marginRight: '12px' };

const PropertyStatsCard: React.FC = () => {
  const [data, setData] = useState<PropertyCountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.get<PropertyCountData>('/api/protected/property-counts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener estadísticas:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!data) return
  <Spinner animation="border" role="status" style={{ color: '#000' }}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>;

  const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    backgroundColor: '#fff',
    height: '100%',
    boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4a4a4a',
    marginBottom: '4px',
  };

  const valueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div className="margin ">
      <Row className="g-2">
        <Col md={6}>
          <div style={cardStyle}>
            <div>
              <div style={valueStyle}>
                <FaHouseChimney style={{ ...iconStyle, color: '#8C7771' }} />
                {data.total}
              </div>
              <div style={labelStyle}>Total de propiedades</div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div style={cardStyle}>
            <div>
              <div style={valueStyle}>
                <FaTag style={{ ...iconStyle, color: '#A08A7D' }} />
                {data.libres}
              </div>
              <div style={labelStyle}>Libres</div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div style={cardStyle}>
            <div>
              <div style={valueStyle}>
                <FaSackDollar style={{ ...iconStyle, color: '#BBAF94' }} />
                {data.liquidando}
              </div>
              <div style={labelStyle}>Liquidando</div>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <div style={cardStyle}>
            <div>
              <div style={valueStyle}>
                <PiSealCheckFill style={{ ...iconStyle, color: '#D6D1BC' }} />
                {data.cancelado}
              </div>
              <div style={labelStyle}>Cancelados</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyStatsCard;