import { useState } from 'react';

function SharePlan({ plan }) {
  const [copied, setCopied] = useState(false);

  const shareText = `Check out my travel plan: "${plan.title}" to ${plan.destination}! ${plan.destinations?.length || 0} amazing places planned. Built with TravelPlanner!`;
  const shareUrl = window.location.href;

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnStyle = (bg) => ({
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none',
    cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', color: '#fff',
    background: bg
  });

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '2rem' }}>
      <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Share your plan</h3>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>Let friends and family know about your trip!</p>

      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#555', lineHeight: '1.5' }}>
        {shareText}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
        <button onClick={shareWhatsApp} style={btnStyle('#25D366')}>
          <span style={{ fontSize: '1rem' }}>💬</span> WhatsApp
        </button>
        <button onClick={shareTwitter} style={btnStyle('#1DA1F2')}>
          <span style={{ fontSize: '1rem' }}>🐦</span> Twitter / X
        </button>
        <button onClick={shareFacebook} style={btnStyle('#1877F2')}>
          <span style={{ fontSize: '1rem' }}>👍</span> Facebook
        </button>
        <button onClick={copyLink} style={btnStyle(copied ? '#28a745' : '#6c757d')}>
          <span style={{ fontSize: '1rem' }}>{copied ? '✓' : '🔗'}</span>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
export default SharePlan;
