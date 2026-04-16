import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      // user state is set by onAuthStateChange in AuthContext
      toast.success('Welcome back!');
      navigate(from);
    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '0.8rem', borderRadius: '8px',
    border: '1px solid #ddd', fontSize: '1rem', marginBottom: '1rem'
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '16px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#0077b6' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Log in to your account</p>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input style={inputStyle} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#ccc' : '#0077b6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#999', fontSize: '0.875rem' }}>
          <Link to="/forgot-password" style={{ color: '#0077b6' }}>Forgot your password?</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
          No account yet? <Link to="/register" style={{ color: '#0077b6' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
