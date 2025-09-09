// src/pages/DashboardPage.jsx
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';

// Mock data: Each farmer has containers with different statuses
const containers = [
  { id: 1, name: 'Container 1', status: 'safe', temp: '12°C', humidity: '65%', location: 'Shed A' },
  { id: 2, name: 'Container 2', status: 'risky', temp: '16°C', humidity: '78%', location: 'Shed A' },
  { id: 3, name: 'Container 3', status: 'spoiled', temp: '18°C', humidity: '85%', location: 'Shed B' },
  { id: 4, name: 'Container 4', status: 'safe', temp: '13°C', humidity: '60%', location: 'Shed C' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'Farmer';
  const name = user.name || 'Farmer';
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      {/* Header */}
    <header style={{
    backgroundColor: 'white',
    padding: '15px 20px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    }}>
    {/* Left Side: Logo + App Name */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
        src={logo}
        alt="Preservion Logo"
        onClick={() => navigate('/dashboard')}
        style={{
            width: '70px',
            height: '70px',
            borderRadius: '8px',
            cursor: 'pointer'
        }}
        />
        <div>
        <h2 style={{
            color: '#2e7d32',
            margin: 0,
            fontSize: '20px'
        }}>
            Preservion
        </h2>
        <p style={{
            margin: 0,
            fontSize: '12px',
            color: '#666'
            }}>
            {t('dashboard.smartOnionStorage')}
            </p>
        </div>
    </div>

    {/* Right Side: User Info and Language Switcher */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <LanguageSwitcher />
        <div style={{ textAlign: 'right' }}>
            <p style={{
            margin: 0,
            color: '#333',
            fontWeight: 'bold'
            }}>
            {t('dashboard.hello')}, {name}! 👨‍🌾
            </p>
            <p style={{
            margin: 0,
            fontSize: '12px',
            color: '#666'
            }}>
            {t(`dashboard.${role.toLowerCase().replace(' ', '')}`)}
            </p>
        </div>
    </div>
    </header>

      {/* Main Content */}
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '28px',
          color: '#2e7d32',
          marginBottom: '20px'
        }}>
          {t('dashboard.yourContainers')}
        </h1>

        {/* Container Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {containers.map((container) => {
            // Set border and status color based on status
            let borderColor, statusText, statusBg;
            if (container.status === 'safe') {
              borderColor = '#4caf50';
              statusText = t('dashboard.safe');
              statusBg = '#e8f5e8';
            } else if (container.status === 'risky') {
              borderColor = '#f59e0b';
              statusText = t('dashboard.risky');
              statusBg = '#fff3e0';
            } else {
              borderColor = '#ef4444';
              statusText = t('dashboard.spoiled');
              statusBg = '#ffebee';
            }

            return (
              <div
                key={container.id}
                onClick={() => navigate(`/container/${container.id}`)}
                style={{
                  border: `4px solid ${borderColor}`,
                  borderRadius: '10px',
                  padding: '20px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <h3 style={{
                  margin: '0 0 10px 0',
                  color: '#333',
                  fontSize: '18px'
                }}>
                  {container.name}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  📍 {container.location}
                </p>
                <p style={{ color: '#444', fontSize: '14px', marginTop: '8px' }}>
                  🌡️ {container.temp} | 💧 {container.humidity}
                </p>

                {/* Status Badge */}
                <div style={{
                  marginTop: '12px',
                  padding: '6px 12px',
                  backgroundColor: statusBg,
                  color: borderColor,
                  borderRadius: '20px',
                  display: 'inline-block',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {statusText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Container Button (Future) */}
        <button
          style={{
            marginTop: '30px',
            padding: '12px 24px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
          onClick={() => alert(t('dashboard.featureComingSoon'))}
        >
          {t('dashboard.addNewContainer')}
        </button>
      </main>
    </div>
  );
}