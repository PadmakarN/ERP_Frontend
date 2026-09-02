import React, { useState, useEffect } from 'react';

const Alert = ({ message, duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.3)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '24px 30px',
          borderRadius: '10px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
          maxWidth: '90%',
          width: '360px',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '500',
          color: '#333',
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default Alert;
