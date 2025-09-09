import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const t = useTranslation(language);
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          color: '#333',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#f5f5f5';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'white';
        }}
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <span style={{ fontSize: '12px' }}>▼</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          minWidth: '120px',
          marginTop: '4px'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: 'none',
                backgroundColor: language === lang.code ? '#e8f5e8' : 'white',
                color: language === lang.code ? '#2e7d32' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseOut={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
