import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ModernDashboard from './pages/ModernDashboard';
import { isAuthenticated } from './utils/api';

const AdminApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthenticated(isAuthenticated());
    setLoading(false);
  }, [location.pathname]);

  const handleLogin = () => {
    setAuthenticated(true);
    // after login, go to /admin
    navigate('/admin', { replace: true });
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

  const RequireAuth = ({ children }) => (
    isAuthenticated() ? children : <Navigate to="/admin/login" replace />
  );

  return (
    <Routes>
      <Route path="login" element={
        authenticated ? <Navigate to="/admin" replace /> : <Login onLogin={handleLogin} />
      } />
      
      <Route path="forgot-password" element={<ForgotPassword />} />
      
      <Route path="reset-password" element={<ResetPassword />} />

      <Route index element={
        <RequireAuth>
          <ModernDashboard />
        </RequireAuth>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminApp;
