'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
        const res = await axios.get<OwnerStat[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/property-by-owner`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        const labels = res.data.map(item => item.owner);
        const values = res.data.map(item => parseInt(item.count));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Cantidad de propiedades',
              data: values,
              backgroundColor: '#8C7771',
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar gráfica de propietarios:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) return <p>Cargando gráfico...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
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
  );
};

export default BarChartByOwner;