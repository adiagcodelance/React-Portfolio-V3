import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE}/auth/forgot-password`, { email });
      setMessage(response.data.message);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
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
          }}>📧</div>
          
          <h1 style={{
            color: 'var(--headline, #111827)',
            fontSize: '22px',
            marginBottom: '16px'
          }}>
            Check Your Email
          </h1>
          
          <p style={{
            color: 'var(--text, #374151)',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            {message}
          </p>
          
          <a
            href="/admin/login"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              background: 'var(--accent, #d97706)',
              color: 'var(--accent-contrast, #0b1220)',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Back to Login
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
          Reset Password
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: 'var(--text, #374151)',
          marginBottom: '24px',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '6px',
              fontWeight: 700,
              color: 'var(--text, #374151)',
              fontSize: '13px',
              letterSpacing: '.02em'
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid var(--border, #e5e7eb)',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
              placeholder="Enter your email"
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

          {message && (
            <div style={{
              background: 'rgba(34,197,94,0.07)',
              color: '#15803d',
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid rgba(34,197,94,0.25)',
              fontSize: '13px'
            }}>
              {message}
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
            {loading ? 'Sending…' : 'Send Reset Link'}
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

export default ForgotPassword;