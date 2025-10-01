import React, { useState, useEffect } from 'react';
import { auth, isAuthenticated } from '../utils/api';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await auth.login(formData);
      // Treat presence of token as success (backend returns both token and user)
      const hasToken = !!localStorage.getItem('adminToken') || !!response?.token;
      if (hasToken) {
        onLogin();
      } else {
        setError('Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-body, #fff)',
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system'
    }}>
      <div style={{
        background: 'var(--surface, #f9fafb)',
        padding: '28px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md, 0 10px 25px -8px #0000001f)',
        width: '100%',
        maxWidth: '420px',
        border: '1px solid var(--border, #e5e7eb)'
      }}>
        <h1 style={{
          textAlign: 'center',
          marginBottom: '18px',
          color: 'var(--headline, #111827)',
          fontSize: '22px'
        }}>
          Admin Login
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px',
              fontWeight: 700,
              color: 'var(--text, #374151)',
              fontSize: '13px',
              letterSpacing: '.02em'
            }}>
              Email or Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px',
              fontWeight: 700,
              color: 'var(--text, #374151)',
              fontSize: '13px',
              letterSpacing: '.02em'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,53,69,0.07)',
              color: '#7f1d1d',
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid rgba(220,53,69,0.25)',
              fontSize: '13px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px 14px',
              background: 'var(--accent, #d97706)',
              color: 'var(--accent-contrast, #0b1220)',
              border: '1px solid var(--accent, #d97706)',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 800,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform .06s ease',
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;