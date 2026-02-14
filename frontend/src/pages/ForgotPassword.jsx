import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE } from '../lib/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      // Always show success to avoid email enumeration
      setSubmitted(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.8rem', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '1rem', marginBottom: '1rem',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
            <h2 style={{ color: '#0077b6', marginBottom: '0.5rem' }}>Check your email</h2>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
              If an account exists for <strong>{email}</strong>, we've sent a password reset link. Check your inbox and spam folder.
            </p>
            <Link to="/login" style={{ color: '#0077b6', textDecoration: 'none', fontSize: '0.9rem' }}>
              ← Back to login
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#0077b6' }}>Reset Password</h2>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
              Enter your email and we'll send you a reset link
            </p>
            <form onSubmit={handleSubmit}>
              <input
                style={inputStyle}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '0.9rem',
                  background: loading ? '#ccc' : '#0077b6',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
              <Link to="/login" style={{ color: '#0077b6' }}>← Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
