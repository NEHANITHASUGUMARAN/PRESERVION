// src/pages/ContainerDetailPage.jsx
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

// 📊 Chart.js Setup
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ContainerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 📊 Sensor Data (mock for now — in real IoT, this comes from sensors)
  const [sensorData] = useState({
    temperature: 16,
    humidity: 72,
    ethylene: 1.8,
    co2: 500,
    onion_type: 'red',
  });

  // 🤖 AI Prediction from Python
  const [ai, setAi] = useState({
    condition: 'Loading...',
    action: 'Waiting for AI...',
    shelfLife: '...',
    confidence: 0,
  });

  // 📈 Time-series data for graphs
  const timeLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
  const [tempData, setTempData] = useState([12, 13, 14, 16, 18, 17, 15]);
  const [humidityData, setHumidityData] = useState([65, 66, 68, 72, 78, 80, 75]);
  const [ethyleneData, setEthyleneData] = useState([0.8, 0.9, 1.1, 1.5, 2.3, 3.0, 4.1]);
  const [co2Data, setCo2Data] = useState([400, 410, 420, 450, 500, 580, 650]);
  const [weightData, setWeightData] = useState([980, 975, 970, 960, 940, 930, 920]);
  const [radiationData, setRadiationData] = useState([0.1, 0.1, 0.2, 0.3, 0.5, 0.7, 1.0]);

  // 🚀 Call Python AI when page loads
  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sensorData),
        });

        const result = await response.json();

        // Update AI result
        setAi({
          condition: result.condition,
          action: result.action,
          shelfLife: result.shelf_life,
          confidence: (result.confidence * 100).toFixed(1),
        });

        // Update graph data (simulate new reading)
        setTempData(prev => [...prev.slice(1), sensorData.temperature]);
        setHumidityData(prev => [...prev.slice(1), sensorData.humidity]);
        setEthyleneData(prev => [...prev.slice(1), sensorData.ethylene]);
        setCo2Data(prev => [...prev.slice(1), sensorData.co2]);

      } catch (error) {
        console.error('AI API Error:', error);
        setAi({
          condition: 'Error',
          action: 'Could not connect to AI server. Is it running?',
          shelfLife: '—',
          confidence: 0,
        });
      }
    };

    fetchPrediction();

    // Optional: Poll AI every 15 seconds
    const interval = setInterval(fetchPrediction, 15000);
    return () => clearInterval(interval);

  }, [sensorData]);

  // 🎨 Get color based on condition
  const getStatusColor = () => {
    if (ai.condition === 'good') return '#4caf50';
    if (ai.condition === 'risky') return '#f59e0b';
    return '#ef4444';
  };

  // 📈 Get trend (is it getting worse?)
  const getTrend = (data) => {
    const latest = data[data.length - 1];
    const oldest = data[0];
    return latest > oldest ? '↑ worsening' : '↓ stable or improving';
  };

  // 📈 Chart: Temperature & Humidity
  const tempHumidData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: tempData,  // ✅ Fixed: added "data:"
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: humidityData,  // ✅ Fixed: added "data:"
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Temperature & Humidity Trend' },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Temperature (°C)' },
        min: 10,
        max: 25,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Humidity (%)' },
        min: 50,
        max: 90,
      },
    },
  };

  // 📊 Gas Levels (Ethylene & CO₂)
  const gasData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Ethylene (ppm)',
        data: ethyleneData,  // ✅ Fixed: added "data:"
        backgroundColor: '#FFCE56',
      },
      {
        label: 'CO₂ (ppm)',
        data: co2Data,  // ✅ Fixed: added "data:"
        backgroundColor: '#4BC0C0',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Gas Levels (Ethylene & CO₂)' },
    },
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '15px 20px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={logo}
            alt="Preservion Logo"
            onClick={() => navigate('/dashboard')}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          />
          <div>
            <h1 style={{ color: '#2e7d32', margin: '0', fontSize: '20px' }}>
              Container {id}
            </h1>
            <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
              Live AI Monitoring
            </p>
          </div>
        </div>

        {/* Right: Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: 'none',
            border: '1px solid #4caf50',
            color: '#4caf50',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          ← Back
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* AI Prediction Box */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px',
          borderLeft: `6px solid ${getStatusColor()}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>🤖 AI Prediction</h2>

          <p>
            <strong>Status:</strong> 
            <span style={{ color: getStatusColor(), fontWeight: 'bold', marginLeft: '8px' }}>
              {ai.condition === 'good' ? '🟢 Safe' :
               ai.condition === 'risky' ? '🟡 Risky' : '🔴 Spoiled'}
            </span>
          </p>

          <p>
            <strong>Action:</strong>{' '}
            <span style={{ color: '#d32f2f', whiteSpace: 'pre-line' }}>
              {ai.action}
            </span>
          </p>

          <p><strong>Shelf Life:</strong> {ai.shelfLife}</p>
          <p><strong>Confidence:</strong> {ai.confidence}%</p>

          {/* Trend Detection */}
          <p><strong>Trend:</strong> Temp {getTrend(tempData)}, Humidity {getTrend(humidityData)}</p>
        </div>

        {/* Charts */}
        <div style={{ marginBottom: '20px', height: '400px' }}>
          <Line data={tempHumidData} options={options} />
        </div>

        <div style={{ marginBottom: '20px', height: '400px' }}>
          <Bar data={gasData} options={barOptions} />
        </div>

        {/* Weight & Radiation */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>Weight (kg)</h3>
            <div style={{ height: '300px' }}>
              <Line
                data={{
                  labels: timeLabels,
                  datasets: [{
                    label: 'Weight',
                    data: weightData,  // ✅ Fixed: added "data:"
                    borderColor: '#9966FF',
                    fill: false
                  }]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3>Radiation Level (μSv/h)</h3>
            <div style={{ height: '300px' }}>
              <Line
                data={{
                  labels: timeLabels,
                  datasets: [{
                    label: 'Radiation',
                    data: radiationData,  // ✅ Fixed: added "data:"
                    borderColor: '#FF6384',
                    fill: false
                  }]
                }}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}