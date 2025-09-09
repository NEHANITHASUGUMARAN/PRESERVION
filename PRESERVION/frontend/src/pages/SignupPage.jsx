// src/pages/SignupPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Farmer');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert(t('signup.fillAllFields'));
      return;
    }

    // Save user to localStorage
    const user = { name, email, password, role };
    localStorage.setItem('user', JSON.stringify(user));

    alert(`✅ Account created! You are now a ${role}.`);
    navigate('/login');
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

      {/* Signup Form */}
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
          {t('signup.title')}
        </h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          {t('signup.subtitle')}
        </p>

        <input
          type="text"
          placeholder={t('signup.name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        >
          <option value="Farmer">👨‍🌾 {t('signup.farmer')}</option>
          <option value="Business Trader">💼 {t('signup.trader')}</option>
          <option value="Government Officer">👮‍♂️ {t('signup.government')}</option>
        </select>

        <button
          onClick={handleSignup}
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
          {t('signup.createAccount')}
        </button>

        <p style={{ marginTop: '15px', color: '#666' }}>
          {t('common.alreadyHaveAccount')}{' '}
          <span
            onClick={() => navigate('/login')}
            style={{
              color: '#4caf50',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {t('common.login')}
          </span>
        </p>
      </div>
    </div>
  );
}