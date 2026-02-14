import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'My Plans', path: '/plans' },
  { name: 'Bookings', path: '/booking' },
  { name: 'Budget', path: '/budget' },
  { name: 'Reviews', path: '/reviews' },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', background: '#f9fafb', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0077b6' }}>TravelPlanner</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.6' }}>
              Your ultimate travel planning companion. Discover destinations, create itineraries, and manage your budget all in one place.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map(item => (
                <li key={item.path}>
                  <Link to={item.path} style={{ fontSize: '0.875rem', color: '#6b7280', textDecoration: 'none' }}
                    onMouseEnter={e => e.target.style.color = '#0077b6'}
                    onMouseLeave={e => e.target.style.color = '#6b7280'}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>Connect With Us</h3>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'X', href: 'https://x.com', icon: '𝕏' },
                { label: 'Facebook', href: 'https://facebook.com', icon: 'f' },
                { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
                { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'in' },
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#fff', border: '1px solid #e5e7eb', color: '#6b7280', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 'bold' }}
                  aria-label={social.label}>
                  {social.icon}
                </a>
              ))}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              <p style={{ marginBottom: '0.25rem' }}>📧 hello@travelplanner.com</p>
              <p>📞 +44 20 1234 5678</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            © 2026 TravelPlanner. All rights reserved. Built with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
