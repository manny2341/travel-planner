import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '../lib/supabase';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } }
      });
      if (error) throw error;
      toast.success('Account created! Welcome, ' + form.name + '!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
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
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: '#0077b6' }}>Create Account</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Start planning your adventures</p>
        <form onSubmit={handleSubmit}>
          <input style={inputStyle} type="text" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <input style={inputStyle} type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required minLength={6} />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.9rem', background: loading ? '#ccc' : '#0077b6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#0077b6' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
