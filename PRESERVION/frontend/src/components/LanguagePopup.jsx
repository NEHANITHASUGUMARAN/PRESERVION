import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';

const LanguagePopup = () => {
  const { language, changeLanguage, showLanguagePopup } = useLanguage();
  const t = useTranslation(language);

  if (!showLanguagePopup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.9), rgba(76, 175, 80, 0.8))',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      fontFamily: 'Segoe UI, Arial, sans-serif',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
        borderRadius: '20px',
        padding: '50px',
        maxWidth: '600px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        animation: 'slideInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '100px',
          height: '100px',
          background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
          borderRadius: '50%',
          opacity: 0.1
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '60px',
          height: '60px',
          background: 'linear-gradient(45deg, #2e7d32, #4caf50)',
          borderRadius: '50%',
          opacity: 0.1
        }} />

        <h2 style={{
          margin: '0 0 20px 0',
          background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '32px',
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          {t('languagePopup.title')}
        </h2>
        
        <p style={{
          margin: '0 0 40px 0',
          color: '#666',
          fontSize: '18px',
          lineHeight: '1.6',
          fontWeight: '500'
        }}>
          Choose your preferred language to continue
        </p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => changeLanguage('en')}
            style={{
              padding: '20px 30px',
              background: language === 'en' 
                ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
                : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              color: language === 'en' ? 'white' : '#495057',
              border: 'none',
              borderRadius: '15px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              boxShadow: language === 'en' 
                ? '0 8px 25px rgba(76, 175, 80, 0.4)' 
                : '0 4px 15px rgba(0, 0, 0, 0.1)',
              transform: language === 'en' ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (language !== 'en') {
                e.target.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (language !== 'en') {
                e.target.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span style={{ fontSize: '24px' }}>🇺🇸</span>
            <span>{t('languagePopup.english')}</span>
            {language === 'en' && (
              <span style={{ 
                position: 'absolute', 
                right: '15px', 
                fontSize: '16px',
                animation: 'pulse 2s infinite'
              }}>✓</span>
            )}
          </button>

          <button
            onClick={() => changeLanguage('ta')}
            style={{
              padding: '20px 30px',
              background: language === 'ta' 
                ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
                : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              color: language === 'ta' ? 'white' : '#495057',
              border: 'none',
              borderRadius: '15px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              boxShadow: language === 'ta' 
                ? '0 8px 25px rgba(76, 175, 80, 0.4)' 
                : '0 4px 15px rgba(0, 0, 0, 0.1)',
              transform: language === 'ta' ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (language !== 'ta') {
                e.target.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (language !== 'ta') {
                e.target.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span style={{ fontSize: '24px' }}>🇮🇳</span>
            <span>{t('languagePopup.tamil')}</span>
            {language === 'ta' && (
              <span style={{ 
                position: 'absolute', 
                right: '15px', 
                fontSize: '16px',
                animation: 'pulse 2s infinite'
              }}>✓</span>
            )}
          </button>

          <button
            onClick={() => changeLanguage('hi')}
            style={{
              padding: '20px 30px',
              background: language === 'hi' 
                ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
                : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
              color: language === 'hi' ? 'white' : '#495057',
              border: 'none',
              borderRadius: '15px',
              fontSize: '20px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              boxShadow: language === 'hi' 
                ? '0 8px 25px rgba(76, 175, 80, 0.4)' 
                : '0 4px 15px rgba(0, 0, 0, 0.1)',
              transform: language === 'hi' ? 'translateY(-2px)' : 'translateY(0)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              if (language !== 'hi') {
                e.target.style.background = 'linear-gradient(135deg, #e8f5e8, #d4edda)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }
            }}
            onMouseOut={(e) => {
              if (language !== 'hi') {
                e.target.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            <span style={{ fontSize: '24px' }}>🇮🇳</span>
            <span>{t('languagePopup.hindi')}</span>
            {language === 'hi' && (
              <span style={{ 
                position: 'absolute', 
                right: '15px', 
                fontSize: '16px',
                animation: 'pulse 2s infinite'
              }}>✓</span>
            )}
          </button>
        </div>

        <button
          onClick={() => changeLanguage(language)}
          style={{
            padding: '18px 40px',
            background: 'linear-gradient(135deg, #2e7d32, #1b5e20)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 6px 20px rgba(46, 125, 50, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #1b5e20, #2e7d32)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #2e7d32, #1b5e20)';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 6px 20px rgba(46, 125, 50, 0.4)';
          }}
        >
          {t('languagePopup.continue')}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguagePopup;
