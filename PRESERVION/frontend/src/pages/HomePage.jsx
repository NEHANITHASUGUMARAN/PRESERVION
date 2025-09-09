// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../utils/translations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PageTransition from '../components/PageTransition';
import AdvancedChart from '../components/AdvancedChart';

export default function HomePage() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isVisible, setIsVisible] = useState(false);

  // Chatbot modal state
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample data for charts
  const storageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Safe Storage',
        data: [85, 88, 92, 89, 94, 96],
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        borderColor: '#4caf50',
        borderWidth: 2,
        fill: true
      },
      {
        label: 'Risky Storage',
        data: [12, 10, 6, 8, 4, 3],
        backgroundColor: 'rgba(255, 193, 7, 0.8)',
        borderColor: '#ffc107',
        borderWidth: 2,
        fill: true
      }
    ]
  };

  const regionData = {
    labels: ['Tiruchirappalli', 'Madurai', 'Coimbatore', 'Salem'],
    datasets: [{
      data: [45, 38, 52, 29],
      backgroundColor: [
        'rgba(76, 175, 80, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(156, 39, 176, 0.8)'
      ],
      borderColor: [
        '#4caf50',
        '#2196f3',
        '#ffc107',
        '#9c27b0'
      ],
      borderWidth: 2
    }]
  };

  return (
    <PageTransition isVisible={isVisible}>
      <div style={{ 
        fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif', 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#d4edda',
        padding: '10px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#155724'
      }}>
        {t('homepage.banner')}
      </div>

      {/* Enhanced Navbar */}
      <nav style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 249, 250, 0.95))',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '15px 30px',
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
            background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
          }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '30px', height: '30px', borderRadius: '8px' }}
            />
          </div>
          <div>
            <h1 style={{ 
              margin: '0', 
              background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '24px',
              fontWeight: '800',
              letterSpacing: '-0.5px'
            }}>Preservion</h1>
            <p style={{ 
              margin: '0', 
              fontSize: '12px', 
              color: '#666',
              fontWeight: '500'
            }}>Smart Onion Storage</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: '#495057',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}>{t('common.home')}</Link>
          <Link to="/about" style={{ 
            textDecoration: 'none', 
            color: '#495057',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>{t('common.about')}</Link>
          <Link to="/features" style={{ 
            textDecoration: 'none', 
            color: '#495057',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>{t('common.features')}</Link>
          <Link to="/contact" style={{ 
            textDecoration: 'none', 
            color: '#495057',
            fontWeight: '600',
            padding: '8px 16px',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}>{t('common.contact')}</Link>
          <Link to="/login" style={{ 
            textDecoration: 'none', 
            background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
            color: 'white',
            fontWeight: '700',
            padding: '12px 24px',
            borderRadius: '12px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)'
          }}>{t('common.loginSignup')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>

      {/* --- Chatbot Button and Modal --- */}
      <div>
        {/* Chatbot Button */}
        <button
          aria-label="Chat with Kizo"
          onClick={() => setShowChatbot(!showChatbot)}
          style={{
            position: 'fixed',
            top: 90, // a little below navbar
            right: 40,
            zIndex: 1200,
            background: 'linear-gradient(135deg, #4caf50 60%, #2196f3 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 70,
            height: 70,
            boxShadow: '0 6px 24px rgba(33,150,243,0.18), 0 2px 8px rgba(76,175,80,0.12)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'box-shadow 0.3s, transform 0.2s',
            fontFamily: 'inherit',
            outline: showChatbot ? '3px solid #2196f3' : 'none'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.07)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(33,150,243,0.22), 0 4px 16px rgba(76,175,80,0.18)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(33,150,243,0.18), 0 2px 8px rgba(76,175,80,0.12)';
          }}
        >
          <span style={{
            fontSize: 32,
            marginBottom: 2,
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))'
          }}>🤖</span>
          <span style={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.5px',
            marginTop: 0,
            color: '#fff',
            textShadow: '0 2px 8px rgba(33,150,243,0.18)'
          }}>Kizo</span>
        </button>

        {/* Chatbot Modal */}
        {showChatbot && (
          <div
            style={{
              position: 'fixed',
              top: 170,
              right: 55,
              width: 370,
              height: 520,
              background: 'linear-gradient(135deg, #f5f7fa 60%, #e3f2fd 100%)',
              borderRadius: 22,
              boxShadow: '0 12px 48px 0 rgba(33,150,243,0.18), 0 2px 8px rgba(76,175,80,0.12)',
              zIndex: 1300,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid #4caf50',
              animation: 'kizo-pop 0.35s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #4caf50 60%, #2196f3 100%)',
              color: '#fff',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 26, marginRight: 4 }}>🤖</span>
                <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '0.5px' }}>Kizo</span>
              </div>
              <button
                aria-label="Close Kizo"
                onClick={() => setShowChatbot(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: 22,
                  cursor: 'pointer',
                  fontWeight: 700,
                  lineHeight: 1
                }}
              >&times;</button>
            </div>
            {/* Chatbot Iframe/Widget */}
            <div style={{ flex: 1, background: '#fff', borderTop: '1px solid #e0e0e0' }}>
              {/* Replace the src below with your actual chatbot URL or widget */}
              <iframe
                title="Kizo Chatbot"
                src="https://www.chatbase.co/chatbot-iframe/6Q9w8pQ2Qv7v1k3n6v7k" // Example, replace with your chatbot
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: 0,
                  background: 'transparent'
                }}
                allow="microphone; clipboard-read; clipboard-write"
              />
            </div>
          </div>
        )}
        {/* Chatbot Modal Animation */}
        <style>{`
          @keyframes kizo-pop {
            0% { opacity: 0; transform: scale(0.85) translateY(40px);}
            100% { opacity: 1; transform: scale(1) translateY(0);}
          }
        `}</style>
      </div>
      {/* --- End Chatbot --- */}

      {/* Enhanced Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.9), rgba(76, 175, 80, 0.8)), url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
          animation: 'float 8s ease-in-out infinite reverse'
        }} />
        
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          maxWidth: '800px',
          position: 'relative',
          zIndex: 2
        }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            margin: '0 0 20px 0',
            fontWeight: '900',
            letterSpacing: '-1px',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {t('homepage.title')}
          </h1>
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', 
            margin: '0 0 30px 0',
            fontWeight: '500',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            {t('homepage.subtitle')}
          </p>
          <button
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
              color: '#2e7d32',
              border: 'none',
              borderRadius: '15px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
          >
            {t('common.getStarted')}
          </button>
        </div>
        
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}</style>
      </section>

      {/* Advanced Analytics Section */}
      <section style={{
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            color: '#2e7d32', 
            marginBottom: '10px',
            fontSize: '2.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 Real-Time Analytics
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1.2rem',
            marginBottom: '50px',
            fontWeight: '500'
          }}>
            Monitor storage health across regions with advanced data visualization
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            <AdvancedChart 
              type="line" 
              data={storageData} 
              title="Storage Health Trends"
              height={350}
            />
            <AdvancedChart 
              type="doughnut" 
              data={regionData} 
              title="Regional Distribution"
              height={350}
            />
          </div>
          
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '40px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
              padding: '30px',
              borderRadius: '20px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.3)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '800' }}>96%</h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>Storage Success Rate</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #2196f3, #1565c0)',
              padding: '30px',
              borderRadius: '20px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(33, 150, 243, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '800' }}>164</h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>Active Containers</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #ff9800, #f57c00)',
              padding: '30px',
              borderRadius: '20px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(255, 152, 0, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '800' }}>24/7</h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>AI Monitoring</p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #9c27b0, #7b1fa2)',
              padding: '30px',
              borderRadius: '20px',
              color: 'white',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(156, 39, 176, 0.3)'
            }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '2.5rem', fontWeight: '800' }}>4</h3>
              <p style={{ margin: '0', fontSize: '1rem', opacity: 0.9 }}>Regions Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section style={{
        padding: '60px 20px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <h2 style={{ 
          color: '#2e7d32', 
          marginBottom: '20px',
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #2e7d32, #4caf50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {t('homepage.howItHelps')}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-10px)';
            e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #4caf50, #2e7d32)',
              borderRadius: '50%',
              opacity: 0.1
            }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              color: '#2e7d32'
            }}>{t('homepage.forFarmers')}</h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#666',
              margin: '0'
            }}>{t('homepage.forFarmersDesc')}</p>
          </div>
          <div style={{
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-10px)';
            e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #2196f3, #1565c0)',
              borderRadius: '50%',
              opacity: 0.1
            }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              color: '#2196f3'
            }}>{t('homepage.forTraders')}</h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#666',
              margin: '0'
            }}>{t('homepage.forTradersDesc')}</p>
          </div>
          <div style={{
            background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
            padding: '40px 30px',
            borderRadius: '20px',
            boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-10px)';
            e.target.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(45deg, #ff9800, #f57c00)',
              borderRadius: '50%',
              opacity: 0.1
            }} />
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              margin: '0 0 15px 0',
              color: '#ff9800'
            }}>{t('homepage.forGovernment')}</h3>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#666',
              margin: '0'
            }}>{t('homepage.forGovernmentDesc')}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
        <footer style={{
        backgroundColor: '#2e7d32',  // Deep green (like Indian flag)
        color: 'white',
        padding: '50px 20px',
        fontFamily: 'Segoe UI, sans-serif',
        lineHeight: '1.7'
        }}>
        <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'left'
        }}>
            {/* Logo + Name */}
            <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px'
            }}>
            <img
                src={logo}
                alt="Preservion Logo"
                style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                border: '2px solid white'
                }}
            />
            <div>
                <h2 style={{
                margin: '0',
                color: 'white',
                fontSize: '20px'
                }}>
                Preservion
                </h2>
                <p style={{
                margin: '0',
                fontSize: '12px',
                color: '#f5f5f5'
                }}>
                Smart Onion Storage System
                </p>
            </div>
            </div>

            {/* Tagline */}
            <p style={{
            margin: '0 0 15px 0',
            color: '#c8e6c9',
            fontSize: '14px'
            }}>
            {t('homepage.tagline')}
            </p>

            {/* Horizontal Line */}
            <hr style={{
            border: '1px solid #4caf50',
            margin: '20px 0',
            opacity: 0.3
            }} />

            {/* Contact Info Grid */}
            <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '30px',
            marginBottom: '25px'
            }}>
            

            <div>
                <p style={{ margin: '0' }}>
                <strong>{t('homepage.email')}</strong><br />
                {t('homepage.email1')}<br />
                {t('homepage.email2')}<br /><br />

                <strong>{t('homepage.phone')}</strong><br />
                {t('homepage.phone1')}
                </p>
            </div>            
            </div>

            {/* Shortcuts */}
            <h3 style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            color: 'white'
            }}>
            {t('common.quickLinks')}
            </h3>
            <hr style={{
            border: '1px solid #4caf50',
            margin: '10px 0',
            opacity: 0.3
            }} />

            <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
            }}>
            <Link to="/about" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.aboutProject')}
            </Link>
            <Link to="/team" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.ourTeam')}
            </Link>
            <Link to="/dashboard" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.farmerDashboard')}
            </Link>
            <Link to="/government-dashboard" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.governmentPortal')}
            </Link>
            <Link to="/contact" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.contactUs')}
            </Link>
            <Link to="/privacy" style={{ color: '#f5f5f5', textDecoration: 'none', fontSize: '14px' }}>
                {t('common.privacyPolicy')}
            </Link>
            </div>

            {/* Copyright */}
            <hr style={{
            border: '1px solid #4caf50',
            margin: '25px 0 15px 0',
            opacity: 0.3
            }} />
            <p style={{
            margin: '0',
            fontSize: '12px',
            color: '#c8e6c9',
            textAlign: 'center'
            }}>
            {t('homepage.copyright')}
            </p>
        </div>
        </footer>
      </div>
    </PageTransition>
  );
}