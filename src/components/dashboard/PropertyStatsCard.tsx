'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Spinner } from 'react-bootstrap';
import { FaHouseChimney, FaTag, FaSackDollar } from 'react-icons/fa6';
import { PiSealCheckFill } from 'react-icons/pi';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PropertyCountData {
  total: string;
  libres: string;
  pagando: string;
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
        const res = await axios.get<PropertyCountData>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/property-counts`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
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

  if (!data) return <p>Error al cargar los datos.</p>;

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
    color: '#007bff',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div className="container my-4">
      <Row className="g-4">
        <Col md={3}>
          <div style={cardStyle}>
            <div>
              <div style={valueStyle}>
                <FaHouseChimney style={iconStyle} />
                {data.total}
              </div>
              <div style={labelStyle}>Total de propiedades</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div style={cardStyle}>
            <div>
              <div style={{...valueStyle, color: 'green' }}>
                <FaTag style={iconStyle} />
                {data.libres}
              </div>
              <div style={labelStyle}>Libres</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div style={cardStyle}>
            <div>
              <div style={{...valueStyle, color: 'orange' }}>
                <FaSackDollar style={iconStyle} />
                {data.pagando}
              </div>
              <div style={labelStyle}>Pagando</div>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div style={cardStyle}>
            <div>
              <div style={{...valueStyle, color: 'red' }}>
                <PiSealCheckFill style={iconStyle} />
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