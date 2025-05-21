import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import PropertyStatsCard from "@/components/dashboard/PropertyStatsCard";
import BarChartByOwner from "@/components/dashboard/BarChartByOwner";
import Header2 from "@/components/common/Header_2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PropertyStateStat {
  state: string;
  count: string;
}

const chartCardStyle = {
  padding: '1.25rem',
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  backgroundColor: '#fff',
  height: '100%',
  boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
};

const PropertyPieChart = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get<PropertyStateStat[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/protected/property-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        const labels = res.data.map((item: PropertyStateStat) => item.state.toUpperCase());
        const values = res.data.map((item: PropertyStateStat) => parseInt(item.count));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Cantidad de inmuebles',
              data: values,
              backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#8BC34A',
                '#FF9800',
                '#9C27B0',
                '#607D8B',
                '#F44336',
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error('Error al cargar gráfico:', err);
      }
    };

    fetchStats();
  }, []);

  if (!chartData) return <p>Cargando gráfico...</p>;

  return (
    <div
      className="bg-white"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        overflow: "auto",
      }}
    >
      <Header2 />
      <div className="container mt-4">
        <PropertyStatsCard />

        <div className="row mt-4 g-4">
          <div className="col-md-6">
            <div style={chartCardStyle}>
              <Pie data={chartData} />
            </div>
          </div>
          <div className="col-md-6">
            <div style={chartCardStyle}>
              <BarChartByOwner />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyPieChart;