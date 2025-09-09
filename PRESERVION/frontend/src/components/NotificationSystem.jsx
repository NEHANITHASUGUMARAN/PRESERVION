import React, { useState, useEffect } from 'react';

const NotificationSystem = ({ notifications, onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      setVisibleNotifications(prev => [...prev, latestNotification]);
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setVisibleNotifications(prev => prev.filter(n => n.id !== latestNotification.id));
      }, 5000);
    }
  }, [notifications]);

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev.filter(n => n.id !== id));
    onDismiss?.(id);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {visibleNotifications.map(notification => (
        <div
          key={notification.id}
          style={{
            background: notification.type === 'error' 
              ? 'linear-gradient(135deg, #ff5252, #d32f2f)'
              : notification.type === 'warning'
              ? 'linear-gradient(135deg, #ff9800, #f57c00)'
              : 'linear-gradient(135deg, #4caf50, #2e7d32)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            minWidth: '300px',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'rgba(255, 255, 255, 0.3)',
            animation: 'progressBar 5s linear forwards'
          }} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>
              {notification.type === 'error' ? '🚨' : notification.type === 'warning' ? '⚠️' : '✅'}
            </span>
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: '700' }}>
                {notification.title}
              </h4>
              <p style={{ margin: '0', fontSize: '12px', opacity: 0.9 }}>
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => handleDismiss(notification.id)}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default NotificationSystem;
