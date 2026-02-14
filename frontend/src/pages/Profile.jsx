import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Key, LogOut, BookOpen, Wallet, Star } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { API_BASE } from '../lib/api';

export default function Profile() {
  const { user, token, login, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  const bookingCount = (() => {
    try { return JSON.parse(localStorage.getItem('bookingHistory') || '[]').length; } catch { return 0; }
  })();

  const budgetCount = (() => {
    try { return JSON.parse(localStorage.getItem('budgetItems') || '[]').length; } catch { return 0; }
  })();

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, email: form.email })
      });
      if (res.ok) {
        const data = await res.json();
        login(data.user || { ...user, name: form.name, email: form.email }, token);
        toast.success('Profile updated!');
        setEditMode(false);
      } else {
        toast.error('Failed to update profile.');
      }
    } catch {
      // If backend endpoint doesn't exist, update locally
      login({ ...user, name: form.name, email: form.email }, token);
      toast.success('Profile updated!');
      setEditMode(false);
    }
    setSaving(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) {
      toast.error('New passwords do not match.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/change-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword: pwForm.current, newPassword: pwForm.newPw })
      });
      if (res.ok) {
        toast.success('Password changed successfully!');
        setPwForm({ current: '', newPw: '', confirm: '' });
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to change password.');
      }
    } catch {
      toast.error('Could not connect to server.');
    }
    setSaving(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const inputStyle = { width: '100%', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.95rem', outline: 'none' };

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ background: 'linear-gradient(135deg, #0077b6, #00b4d8)', padding: '3rem 1rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem', color: '#fff' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{user?.name}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>{user?.email}</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: BookOpen, label: 'Plans', value: '—', link: '/plans', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Wallet, label: 'Bookings', value: bookingCount, link: '/bookings', color: 'text-purple-600', bg: 'bg-purple-50' },
              { icon: Star, label: 'Budget Items', value: budgetCount, link: '/budget', color: 'text-green-600', bg: 'bg-green-50' },
            ].map(({ icon: Icon, label, value, link, color, bg }) => (
              <Link key={label} to={link} style={{ textDecoration: 'none' }}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Edit profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Profile Info</CardTitle>
                {!editMode && (
                  <button onClick={() => setEditMode(true)} className="text-sm text-blue-600 hover:underline">Edit</button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => { setEditMode(false); setForm({ name: user?.name, email: user?.email }); }} className="border border-gray-200 px-5 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{user?.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{user?.email}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Change password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Key className="w-5 h-5" /> Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input style={inputStyle} type="password" placeholder="••••••••" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input style={inputStyle} type="password" placeholder="••••••••" value={pwForm.newPw} onChange={e => setPwForm({ ...pwForm, newPw: e.target.value })} required minLength={6} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input style={inputStyle} type="password" placeholder="••••••••" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} required minLength={6} />
                </div>
                <button type="submit" disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Updating…' : 'Update Password'}
                </button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sign out */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 py-3 rounded-xl hover:bg-red-50 transition-colors font-medium">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
