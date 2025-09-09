// src/pages/GovernmentDashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PageTransition from '../components/PageTransition';
import AdvancedChart from '../components/AdvancedChart';
import AdvancedDataTable from '../components/AdvancedDataTable';
import NotificationSystem from '../components/NotificationSystem';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRealTimeData } from '../hooks/useRealTimeData';

export default function GovernmentDashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Initial regions data
  const initialRegions = [
    {
      id: 1,
      name: 'Tiruchirappalli',
      totalContainers: 45,
      safe: 32,
      risky: 10,
      spoiled: 3,
      alertCount: 3,
      compliance: 95,
      temperature: 14.2,
      humidity: 65.3,
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      name: 'Madurai',
      totalContainers: 38,
      safe: 25,
      risky: 11,
      spoiled: 2,
      alertCount: 2,
      compliance: 89,
      temperature: 16.8,
      humidity: 72.1,
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 3,
      name: 'Coimbatore',
      totalContainers: 52,
      safe: 30,
      risky: 18,
      spoiled: 4,
      alertCount: 4,
      compliance: 92,
      temperature: 15.5,
      humidity: 68.7,
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 4,
      name: 'Salem',
      totalContainers: 29,
      safe: 24,
      risky: 4,
      spoiled: 1,
      alertCount: 1,
      compliance: 88,
      temperature: 17.2,
      humidity: 74.3,
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 5,
      name: 'Erode',
      totalContainers: 28,
      safe: 22,
      risky: 4,
      spoiled: 2,
      alertCount: 2,
      compliance: 85,
      temperature: 18.1,
      humidity: 76.8,
      lastUpdated: new Date().toLocaleTimeString()
    }
  ];

  // Use real-time data hook
  const { data: regions, isConnected, lastUpdate, refreshData } = useRealTimeData(initialRegions, 4000);

  // Generate notifications based on data changes
  useEffect(() => {
    const lowComplianceRegions = regions.filter(r => r.compliance < 90);
    if (lowComplianceRegions.length > 0) {
      const notification = {
        id: Date.now(),
        type: 'warning',
        title: 'Compliance Alert',
        message: `${lowComplianceRegions.length} region(s) have compliance below 90%`
      };
      setNotifications(prev => [...prev, notification]);
    }
  }, [regions]);

  // Filter regions based on selected filter
  const filteredRegions = useMemo(() => {
    if (selectedRegion === 'all') return regions;
    return regions.filter(region => region.name.toLowerCase().includes(selectedRegion.toLowerCase()));
  }, [regions, selectedRegion]);

  // Table columns configuration
  const tableColumns = [
    { key: 'name', label: 'Region' },
    { key: 'totalContainers', label: 'Total Containers' },
    { key: 'safe', label: 'Safe' },
    { key: 'risky', label: 'Risky' },
    { key: 'spoiled', label: 'Spoiled' },
    { key: 'compliance', label: 'Compliance (%)' },
    { key: 'temperature', label: 'Avg Temp (°C)' },
    { key: 'humidity', label: 'Avg Humidity (%)' },
    { key: 'alertCount', label: 'Active Alerts' }
  ];

  const handleRowClick = (region) => {
    alert(`📊 Detailed view for ${region.name} region`);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Mock: Recent alerts
  const alerts = [
    { id: 1, region: 'Coimbatore', message: 'High ethylene levels in Container #C42', time: '10 mins ago', severity: 'high' },
    { id: 2, region: 'Madurai', message: 'Humidity spike in 3 containers', time: '25 mins ago', severity: 'medium' },
    { id: 3, region: 'Tiruchirappalli', message: 'Temperature rising above 18°C', time: '1 hour ago', severity: 'medium' }
  ];

  // Summary stats
  const totalContainers = regions.reduce((sum, r) => sum + r.totalContainers, 0);
  const totalSpoiled = regions.reduce((sum, r) => sum + r.spoiled, 0);
  const totalRisky = regions.reduce((sum, r) => sum + r.risky, 0);
  const complianceRate = Math.round(((totalContainers - totalSpoiled) / totalContainers) * 100);

  // Chart Data
  const barData = {
    labels: regions.map(r => r.name),
    datasets: [
      {
        label: 'Safe',
        data: regions.map(r => r.safe),
        backgroundColor: '#4caf50',
        borderRadius: 6,
      },
      {
        label: 'Risky',
        data: regions.map(r => r.risky),
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
      {
        label: 'Spoiled',
        data: regions.map(r => r.spoiled),
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spoiled Containers',
        data: [2, 3, 5, 7, 4, 6],
        borderColor: '#ef4444',
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Compliance Rate (%)',
        data: [85, 88, 82, 86, 89, 90],
        borderColor: '#4caf50',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Region-wise Storage Health' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Trends Over Time' },
    },
  };

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <PageTransition isVisible={isVisible}>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative'
      }}>
        {/* Notification System */}
        <NotificationSystem 
          notifications={notifications} 
          onDismiss={handleDismissNotification} 
        />

        {/* Enhanced Header */}
        <header style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.95))',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '20px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: 'linear-gradient(135deg, #ff9800, #f57c00)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)'
            }}>
              <span style={{ fontSize: '24px' }}>🏛️</span>
            </div>
            <div>
              <h1 style={{ 
                margin: '0', 
                background: 'linear-gradient(135deg, #ff9800, #f57c00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '24px',
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                {t('governmentDashboard.title')}
              </h1>
              <p style={{ 
                margin: '0', 
                fontSize: '12px', 
                color: '#666',
                fontWeight: '500'
              }}>
                {t('governmentDashboard.subtitle')} • Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 15px',
              background: isConnected ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
              borderRadius: '20px',
              border: `1px solid ${isConnected ? '#4caf50' : '#f44336'}`
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isConnected ? '#4caf50' : '#f44336',
                animation: isConnected ? 'pulse 2s infinite' : 'none'
              }} />
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: isConnected ? '#4caf50' : '#f44336'
              }}>
                {isConnected ? 'Live Data' : 'Offline'}
              </span>
            </div>
            <button
              onClick={refreshData}
              style={{
                padding: '8px 15px',
                background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              🔄 Refresh
            </button>
            <LanguageSwitcher />
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: '1px solid #4caf50',
                color: '#4caf50',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              ← {t('common.home')}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ padding: '30px', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Dashboard Overview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>
                {regions.reduce((sum, r) => sum + r.totalContainers, 0)}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                📦 {t('governmentDashboard.totalContainers')}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>
                {regions.reduce((sum, r) => sum + r.safe, 0)}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                ✅ {t('governmentDashboard.safe')}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #ff9800, #f57c00)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(255, 152, 0, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>
                {regions.reduce((sum, r) => sum + r.risky, 0)}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                ⚠️ {t('governmentDashboard.risky')}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f44336, #d32f2f)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(244, 67, 54, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>
                {regions.reduce((sum, r) => sum + r.spoiled, 0)}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                🔴 {t('governmentDashboard.spoiled')}
              </p>
            </div>
          </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0', color: '#2e7d32' }}>{t('governmentDashboard.totalContainers')}</h3>
            <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {totalContainers}
            </p>
          </div>

          <div style={{
            backgroundColor: '#e8f5e8',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0', color: '#2e7d32' }}>{t('governmentDashboard.safe')}</h3>
            <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {totalContainers - totalRisky - totalSpoiled}
            </p>
          </div>

          <div style={{
            backgroundColor: '#fff3e0',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0', color: '#f59e0b' }}>{t('governmentDashboard.risky')}</h3>
            <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {totalRisky}
            </p>
          </div>

          <div style={{
            backgroundColor: '#ffebee',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0', color: '#ef4444' }}>{t('governmentDashboard.spoiled')}</h3>
            <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {totalSpoiled}
            </p>
          </div>

          <div style={{
            backgroundColor: '#e3f2fd',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0', color: '#1565c0' }}>{t('governmentDashboard.compliance')}</h3>
            <p style={{ margin: '10px 0', fontSize: '24px', fontWeight: 'bold' }}>
              {complianceRate}%
            </p>
          </div>
        </div>

        {/* Advanced Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <AdvancedChart 
            type="bar" 
            data={barData} 
            title={t('governmentDashboard.regionWiseHealth')}
            height={400}
          />
          <AdvancedChart 
            type="line" 
            data={lineData} 
            title={t('governmentDashboard.trendsOverTime')}
            height={400}
          />
        </div>

          {/* Filter Controls */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            padding: '20px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ 
              margin: '0',
              fontSize: '1.8rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Regional Data Analysis
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['all', 'Tiruchirappalli', 'Madurai', 'Coimbatore', 'Salem', 'Erode'].map(region => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  style={{
                    padding: '10px 20px',
                    background: selectedRegion === region 
                      ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
                      : 'white',
                    color: selectedRegion === region ? 'white' : '#495057',
                    border: `2px solid ${selectedRegion === region ? '#4caf50' : '#e0e0e0'}`,
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {region === 'all' ? 'All Regions' : region}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Data Table */}
          <AdvancedDataTable
            data={filteredRegions}
            columns={tableColumns}
            title="Regional Storage Health Report"
            onRowClick={handleRowClick}
          />

          {/* Recent Alerts */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            marginTop: '30px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ 
              color: '#2e7d32', 
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t('governmentDashboard.recentAlerts')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '15px',
                    background: alert.severity === 'high' 
                      ? 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(211, 47, 47, 0.05))'
                      : 'linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(245, 124, 0, 0.05))',
                    borderRadius: '12px',
                    borderLeft: `4px solid ${alert.severity === 'high' ? '#ef4444' : '#f59e0b'}`,
                    fontSize: '14px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateX(5px)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <strong style={{ color: alert.severity === 'high' ? '#ef4444' : '#f59e0b' }}>
                    {alert.region}:
                  </strong> {alert.message} 
                  <span style={{ color: '#666', marginLeft: '10px', fontWeight: '500' }}>
                    ({alert.time})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Note */}
          <p style={{
            marginTop: '30px',
            fontSize: '12px',
            color: '#666',
            textAlign: 'center'
          }}>
            {t('governmentDashboard.dataUpdated')}
          </p>
        </main>
        
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}