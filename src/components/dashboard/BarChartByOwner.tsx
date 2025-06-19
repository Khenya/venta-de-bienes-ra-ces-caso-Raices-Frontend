'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Spinner from 'react-bootstrap/Spinner';
import api from '@/utils/api';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface OwnerStat {
  owner: string;
  count: string;
}

const BarChartByOwner: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.get<OwnerStat[]>('/api/protected/property-by-owner', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const labels = res.data.map(item => item.owner);
        const values = res.data.map(item => parseInt(item.count));

        const colors = [
          '#8C7771',
          '#A08A7D',
          '#BBAF94',
          '#D6D1BC',
          '#ECE9DB',
          '#F8F6F0'
        ];

        setChartData({
          labels,
          datasets: [
            {
              label: 'Cantidad de propiedades',
              data: values,
              backgroundColor: labels.map((_, i) => colors[i % colors.length]),
              borderRadius: 6
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar gráfica de propietarios:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return
  <Spinner animation="border" role="status" style={{ color: '#000' }}>
    <span className="visually-hidden">Loading...</span>
  </Spinner>;

  return (
    <div style={{ marginTop: '16px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '12px', backgroundColor: 'white' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChartByOwner;