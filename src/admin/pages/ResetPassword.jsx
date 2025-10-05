import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');

  const location = useLocation();
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    // Get token from URL params
    const urlParams = new URLSearchParams(location.search);
    const resetToken = urlParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setError('Invalid reset link. Please request a new password reset.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/auth/reset-password`, {
        token,
        password
      });
      
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          padding: '32px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-md, 0 10px 25px -8px #0000001f)',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid var(--border, #e5e7eb)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>✅</div>
          
          <h1 style={{
            color: 'var(--headline, #111827)',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            Password Reset
          </h1>
          
          <p style={{
            color: 'var(--text, #374151)',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            Your password has been reset successfully. You can now log in with your new password.
          </p>
          
          <a
            href="/admin/login"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--accent, #d97706)',
              color: 'var(--accent-contrast, #0b1220)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  if (!token) {
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
          padding: '32px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-md, 0 10px 25px -8px #0000001f)',
          width: '100%',
          maxWidth: '420px',
          border: '1px solid var(--border, #e5e7eb)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>⚠️</div>
          
          <h1 style={{
            color: 'var(--headline, #111827)',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            Invalid Reset Link
          </h1>
          
          <p style={{
            color: 'var(--text, #374151)',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            This password reset link is invalid or has expired. Please request a new password reset.
          </p>
          
          <a
            href="/admin/forgot-password"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: 'var(--accent, #d97706)',
              color: 'var(--accent-contrast, #0b1220)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Request New Reset
          </a>
        </div>
      </div>
    );
  }

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
          Set New Password
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: 'var(--text, #374151)',
          marginBottom: '24px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px',
              fontWeight: 700,
              color: 'var(--text, #374151)',
              fontSize: '13px',
              letterSpacing: '.02em'
            }}>
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Enter new password"
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
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Confirm new password"
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
              marginBottom: '16px'
            }}
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <a
              href="/admin/login"
              style={{
                color: 'var(--text-light, #6b7280)',
                textDecoration: 'none',
                fontSize: '13px'
              }}
            >
              ← Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;