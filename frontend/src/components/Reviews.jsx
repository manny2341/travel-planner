import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../lib/api';

function StarRating({ value, onChange, readonly }) {
  return (
    <div style={{ display: 'flex', gap: '0.2rem' }}>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          onClick={() => !readonly && onChange(star)}
          style={{ fontSize: '1.4rem', cursor: readonly ? 'default' : 'pointer', color: star <= value ? '#f77f00' : '#ddd' }}>
          ★
        </span>
      ))}
    </div>
  );
}

function Reviews({ placeId, placeName }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  useEffect(() => { fetchReviews(); }, [placeId]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews/${placeId}`);
      const data = await res.json();
      setReviews(data);
    } catch (err) { console.error(err); }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('${API_BASE}/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, placeId, placeName, userName: user.name })
      });
      const data = await res.json();
      if (data.message) { setError(data.message); return; }
      setReviews([data, ...reviews]);
      setShowForm(false);
      setForm({ rating: 5, comment: '' });
    } catch (err) { console.error(err); }
  };

  const deleteReview = async (id) => {
    await fetch(`${API_BASE}/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setReviews(reviews.filter(r => r._id !== id));
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ color: '#333', marginBottom: '0.2rem' }}>Reviews ({reviews.length})</h3>
          {avgRating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <StarRating value={Math.round(avgRating)} readonly />
              <span style={{ color: '#666', fontSize: '0.9rem' }}>{avgRating} average</span>
            </div>
          )}
        </div>
        {user && !showForm && (
          <button onClick={() => setShowForm(true)} style={{ background: '#0077b6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={submitReview} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>Your Review</h4>
          {error && <p style={{ color: 'red', marginBottom: '0.8rem', fontSize: '0.9rem' }}>{error}</p>}
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.4rem' }}>Rating</p>
            <StarRating value={form.rating} onChange={v => setForm({...form, rating: v})} />
          </div>
          <textarea
            placeholder="Share your experience..."
            value={form.comment}
            onChange={e => setForm({...form, comment: e.target.value})}
            required
            rows={4}
            style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', marginBottom: '0.8rem', resize: 'vertical' }}
          />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" style={{ flex: 1, padding: '0.7rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Submit Review
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '0.7rem', background: '#fff', color: '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '12px', color: '#888' }}>
          <p>No reviews yet. Be the first to review {placeName}!</p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {reviews.map(review => (
          <div key={review._id} style={{ background: '#fff', borderRadius: '12px', padding: '1.2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div>
                <span style={{ fontWeight: '500', color: '#333' }}>{review.userName}</span>
                <span style={{ color: '#888', fontSize: '0.8rem', marginLeft: '0.8rem' }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              {user && user.name === review.userName && (
                <button onClick={() => deleteReview(review._id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Delete
                </button>
              )}
            </div>
            <StarRating value={review.rating} readonly />
            <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: '1.5' }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Reviews;
