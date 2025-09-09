// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleLogin = () => {
    if (!email || !password) {
      alert(t('login.enterEmailPassword'));
      return;
    }

    // Get user from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (savedUser.email === email && savedUser.password === password) {
      // ✅ Login successful
      localStorage.setItem('user', JSON.stringify(savedUser));
      
      // Redirect based on role
      if (savedUser.role === 'Farmer') {
        navigate('/farmer-dashboard');
      } else if (savedUser.role === 'Business Trader') {
        navigate('/trader-dashboard');
      } else if (savedUser.role === 'Government Officer') {
        navigate('/government-dashboard');
      } else {
        navigate('/dashboard'); // default
      }
    } else {
      alert(t('login.invalidCredentials'));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      padding: '20px'
    }}>
      {/* Back Button and Language Switcher */}
      <div style={{
        position: 'absolute',
        top: 24,
        right: 24,
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <LanguageSwitcher />
        <button
          onClick={() => window.history.back()}
          style={{
            background: '#fff',
            color: '#7B1841',
            border: '2px solid #7B1841',
            borderRadius: '50px',
            padding: '8px 18px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}
        >
          ← {t('common.back')}
        </button>
      </div>

      {/* Login Form */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{
          margin: '0 0 10px 0',
          color: '#2e7d32',
          fontSize: '24px'
        }}>
          {t('login.title')}
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {t('login.subtitle')}
        </p>

        <input
          type="email"
          placeholder={t('common.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <input
          type="password"
          placeholder={t('common.password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          {t('common.login')}
        </button>

        <p style={{ marginTop: '15px', color: '#666' }}>
          {t('common.dontHaveAccount')}{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{
              color: '#4caf50',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {t('common.signup')}
          </span>
        </p>
      </div>
    </div>
  );
}