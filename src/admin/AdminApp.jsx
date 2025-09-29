import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './utils/api';

const AdminApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Loading...
      </div>
    );
  }

  return authenticated ? <Dashboard /> : <Login onLogin={handleLogin} />;
};

export default AdminApp;