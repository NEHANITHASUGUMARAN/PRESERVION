// src/pages/TraderDashboard.jsx
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

export default function TraderDashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Initial farmers data
  const initialFarmers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Tiruchirappalli, TN',
      quality: 'High',
      shelfLife: '50–60 days',
      temperature: 14.2,
      humidity: 65.3,
      ethylene: 0.9,
      status: 'safe',
      contact: '+91 98765 4321',
      price: '₹45/kg',
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 2,
      name: 'Suresh Patel',
      location: 'Madurai, TN',
      quality: 'Medium',
      shelfLife: '25–30 days',
      temperature: 17.1,
      humidity: 78.2,
      ethylene: 2.1,
      status: 'risky',
      contact: '+91 98765 4322',
      price: '₹38/kg',
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 3,
      name: 'Vijay Sharma',
      location: 'Coimbatore, TN',
      quality: 'Low',
      shelfLife: '5–10 days',
      temperature: 19.3,
      humidity: 85.1,
      ethylene: 4.2,
      status: 'spoiled',
      contact: '+91 98765 4323',
      price: '₹25/kg',
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 4,
      name: 'Priya Singh',
      location: 'Salem, TN',
      quality: 'High',
      shelfLife: '45–55 days',
      temperature: 13.8,
      humidity: 62.1,
      ethylene: 0.7,
      status: 'safe',
      contact: '+91 98765 4324',
      price: '₹42/kg',
      lastUpdated: new Date().toLocaleTimeString()
    },
    {
      id: 5,
      name: 'Arun Kumar',
      location: 'Erode, TN',
      quality: 'Medium',
      shelfLife: '20–25 days',
      temperature: 16.5,
      humidity: 75.8,
      ethylene: 1.8,
      status: 'risky',
      contact: '+91 98765 4325',
      price: '₹35/kg',
      lastUpdated: new Date().toLocaleTimeString()
    }
  ];

  // Use real-time data hook
  const { data: farmers, isConnected, lastUpdate, refreshData } = useRealTimeData(initialFarmers, 3000);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Generate notifications based on data changes
  useEffect(() => {
    const riskyFarmers = farmers.filter(f => f.status === 'risky');
    if (riskyFarmers.length > 0) {
      const notification = {
        id: Date.now(),
        type: 'warning',
        title: 'Quality Alert',
        message: `${riskyFarmers.length} farmer(s) have risky storage conditions`
      };
      setNotifications(prev => [...prev, notification]);
    }
  }, [farmers]);

  // Chart data for market trends
  const marketTrendsData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'High Quality',
        data: [12, 15, 18, 14, 16, 20],
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        borderColor: '#4caf50',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Medium Quality',
        data: [8, 10, 12, 9, 11, 8],
        backgroundColor: 'rgba(255, 193, 7, 0.8)',
        borderColor: '#ffc107',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Low Quality',
        data: [3, 2, 1, 4, 2, 1],
        backgroundColor: 'rgba(244, 67, 54, 0.8)',
        borderColor: '#f44336',
        borderWidth: 2,
        fill: true
      }
    ]
  }), []);

  const priceDistributionData = useMemo(() => ({
    labels: ['₹25-30', '₹30-35', '₹35-40', '₹40-45', '₹45+'],
    datasets: [{
      data: [1, 1, 2, 1, 0],
      backgroundColor: [
        'rgba(244, 67, 54, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(156, 39, 176, 0.8)'
      ],
      borderColor: [
        '#f44336',
        '#ffc107',
        '#2196f3',
        '#4caf50',
        '#9c27b0'
      ],
      borderWidth: 2
    }]
  }), []);

  // Filter farmers based on selected filter
  const filteredFarmers = useMemo(() => {
    if (selectedFilter === 'all') return farmers;
    return farmers.filter(farmer => farmer.status === selectedFilter);
  }, [farmers, selectedFilter]);

  // Table columns configuration
  const tableColumns = [
    { key: 'name', label: 'Farmer Name' },
    { key: 'location', label: 'Location' },
    { key: 'quality', label: 'Quality' },
    { key: 'temperature', label: 'Temperature (°C)' },
    { key: 'humidity', label: 'Humidity (%)' },
    { key: 'ethylene', label: 'Ethylene (ppm)' },
    { key: 'price', label: 'Price' },
    { key: 'status', label: 'Status' }
  ];

  const handleRowClick = (farmer) => {
    alert(`📞 Contacting ${farmer.name} at ${farmer.contact}`);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
              background: 'linear-gradient(135deg, #2196f3, #1565c0)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)'
            }}>
              <span style={{ fontSize: '24px' }}>💼</span>
            </div>
            <div>
              <h1 style={{ 
                margin: '0', 
                background: 'linear-gradient(135deg, #2196f3, #1565c0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: '24px',
                fontWeight: '800',
                letterSpacing: '-0.5px'
              }}>
                {t('traderDashboard.title')}
              </h1>
              <p style={{ 
                margin: '0', 
                fontSize: '12px', 
                color: '#666',
                fontWeight: '500'
              }}>
                {t('traderDashboard.subtitle')} • Last updated: {lastUpdate.toLocaleTimeString()}
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
                {farmers.filter(f => f.status === 'safe').length}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                ✅ {t('traderDashboard.highQuality')}
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
                {farmers.filter(f => f.status === 'risky').length}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                ⚠️ {t('traderDashboard.mediumQuality')}
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
                {farmers.filter(f => f.status === 'spoiled').length}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                ❌ {t('traderDashboard.lowQuality')}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #2196f3, #1565c0)',
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem', fontWeight: '800' }}>
                {farmers.length}
              </h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>
                📊 Total Farmers
              </p>
            </div>
          </div>

          {/* Advanced Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <AdvancedChart 
              type="line" 
              data={marketTrendsData} 
              title="Market Quality Trends"
              height={350}
            />
            <AdvancedChart 
              type="doughnut" 
              data={priceDistributionData} 
              title="Price Distribution"
              height={350}
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
              {t('traderDashboard.onionQualityReports')}
            </h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['all', 'safe', 'risky', 'spoiled'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  style={{
                    padding: '10px 20px',
                    background: selectedFilter === filter 
                      ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
                      : 'white',
                    color: selectedFilter === filter ? 'white' : '#495057',
                    border: `2px solid ${selectedFilter === filter ? '#4caf50' : '#e0e0e0'}`,
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'capitalize'
                  }}
                >
                  {filter === 'all' ? 'All' : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Data Table */}
          <AdvancedDataTable
            data={filteredFarmers}
            columns={tableColumns}
            title="Farmer Quality Reports"
            onRowClick={handleRowClick}
          />
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