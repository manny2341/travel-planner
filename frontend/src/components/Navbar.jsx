import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const publicNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Bookings', path: '/booking' },
  { name: 'Budget', path: '/budget' },
  { name: 'Reviews', path: '/reviews' },
];

const authNavItems = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'My Plans', path: '/plans' },
  { name: 'Bookings', path: '/booking' },
  { name: 'My Bookings', path: '/bookings' },
  { name: 'Budget', path: '/budget' },
  { name: 'Reviews', path: '/reviews' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navItems = user ? authNavItems : publicNavItems;
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0077b6' }}>TravelPlanner</span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
            {navItems.map(item => (
              <NavLink key={item.path} to={item.path}
                style={({ isActive }) => ({
                  padding: '0.5rem 0.75rem', borderRadius: '8px', textDecoration: 'none',
                  fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s',
                  background: isActive ? '#0077b6' : 'transparent',
                  color: isActive ? '#fff' : '#6b7280',
                })}>
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to="/profile" style={{ fontSize: '0.875rem', color: '#0077b6', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <User size={15} /> {user.name}
                </Link>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid #e5e7eb', color: '#6b7280', padding: '0.4rem 0.75rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to="/login" style={{ textDecoration: 'none', color: '#6b7280', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.875rem' }}>Login</Link>
                <Link to="/register" style={{ textDecoration: 'none', background: '#0077b6', color: '#fff', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.875rem' }}>Sign Up</Link>
              </div>
            )}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.4rem' }}
              className="show-mobile">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            style={{ borderTop: '1px solid #e5e7eb', background: '#fff' }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                  style={({ isActive }) => ({
                    padding: '0.75rem 1rem', borderRadius: '8px', textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: '500',
                    background: isActive ? '#0077b6' : 'transparent',
                    color: isActive ? '#fff' : '#374151',
                  })}>
                  {item.name}
                </NavLink>
              ))}
              {user ? (
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left' }}>
                  <LogOut size={16} /> Logout
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 0' }}>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} style={{ flex: 1, textAlign: 'center', textDecoration: 'none', border: '1px solid #e5e7eb', color: '#374151', padding: '0.6rem', borderRadius: '8px', fontSize: '0.875rem' }}>Login</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} style={{ flex: 1, textAlign: 'center', textDecoration: 'none', background: '#0077b6', color: '#fff', padding: '0.6rem', borderRadius: '8px', fontSize: '0.875rem' }}>Sign Up</Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
