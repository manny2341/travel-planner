import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SharePlan from '../components/SharePlan';
import { API_BASE } from '../lib/api';

const CATEGORIES = ['Food', 'Transport', 'Accommodation', 'Activities', 'Shopping', 'Other'];

function PlanDetail() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expense, setExpense] = useState({ description: '', amount: '', category: 'Food' });
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { fetchPlan(); }, []);

  const fetchPlan = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPlan(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/plans/${id}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...expense, amount: parseFloat(expense.amount) })
      });
      const data = await res.json();
      setPlan(data);
      setExpense({ description: '', amount: '', category: 'Food' });
      setShowExpenseForm(false);
    } catch (err) { console.error(err); }
  };

  const deleteExpense = async (expenseId) => {
    try {
      const res = await fetch(`${API_BASE}/api/plans/${id}/expenses/${expenseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPlan(data);
    } catch (err) { console.error(err); }
  };

  const removeDestination = async (placeId) => {
    try {
      await fetch(`${API_BASE}/api/plans/${id}/destinations/${placeId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan({ ...plan, destinations: plan.destinations.filter(d => d._id !== placeId) });
    } catch (err) { console.error(err); }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Loading plan...</p>;
  if (!plan) return <p style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Plan not found.</p>;

  const days = plan.startDate && plan.endDate
    ? Math.ceil((new Date(plan.endDate) - new Date(plan.startDate)) / (1000 * 60 * 60 * 24))
    : null;
  const spent = plan.spent || 0;
  const remaining = plan.budget - spent;
  const percentage = plan.budget > 0 ? Math.min((spent / plan.budget) * 100, 100) : 0;
  const barColor = percentage > 90 ? '#dc3545' : percentage > 70 ? '#f77f00' : '#0077b6';

  const categoryTotals = CATEGORIES.map(cat => ({
    name: cat,
    total: plan.expenses?.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0) || 0
  })).filter(c => c.total > 0);

  const inputStyle = { width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', marginBottom: '0.8rem' };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ background: 'linear-gradient(135deg, #0077b6, #00b4d8)', padding: '3rem 2rem', textAlign: 'center' }}>
        <button onClick={() => navigate('/plans')} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', padding: '0.4rem 1rem', borderRadius: '20px', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Back to Plans
        </button>
        <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{plan.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>📍 {plan.destination}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
          {days && <span>📅 {days} days</span>}
          {plan.budget > 0 && <span>💰 Budget: ${plan.budget}</span>}
          <span>📌 {plan.destinations?.length || 0} places</span>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>

        <SharePlan plan={plan} />

        {plan.budget > 0 && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#333' }}>Budget calculator</h3>
              <button onClick={() => setShowExpenseForm(!showExpenseForm)} style={{ background: '#0077b6', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                + Add Expense
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#e8f4fd', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>Total budget</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '500', color: '#0077b6' }}>${plan.budget}</p>
              </div>
              <div style={{ background: '#fff3cd', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>Spent</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '500', color: '#856404' }}>${spent.toFixed(2)}</p>
              </div>
              <div style={{ background: remaining >= 0 ? '#d4edda' : '#f8d7da', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>Remaining</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '500', color: remaining >= 0 ? '#155724' : '#721c24' }}>${remaining.toFixed(2)}</p>
              </div>
            </div>
            <div style={{ background: '#e9ecef', borderRadius: '10px', height: '14px', marginBottom: '0.5rem' }}>
              <div style={{ background: barColor, borderRadius: '10px', height: '14px', width: `${percentage}%`, transition: 'width 0.5s' }}></div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#888', textAlign: 'right' }}>{Math.round(percentage)}% of budget used</p>
            {categoryTotals.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>Spending by category:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {categoryTotals.map(c => (
                    <span key={c.name} style={{ background: '#e8f4fd', color: '#0077b6', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
                      {c.name}: ${c.total.toFixed(2)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {showExpenseForm && (
              <form onSubmit={addExpense} style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                <input style={inputStyle} type="text" placeholder="Description (e.g. Dinner at restaurant)" value={expense.description} onChange={e => setExpense({...expense, description: e.target.value})} required />
                <input style={inputStyle} type="number" placeholder="Amount ($)" step="0.01" value={expense.amount} onChange={e => setExpense({...expense, amount: e.target.value})} required />
                <select style={inputStyle} value={expense.category} onChange={e => setExpense({...expense, category: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" style={{ flex: 1, padding: '0.7rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Add Expense</button>
                  <button type="button" onClick={() => setShowExpenseForm(false)} style={{ flex: 1, padding: '0.7rem', background: '#f8f9fa', color: '#333', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            )}
            {plan.expenses?.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{ color: '#333', marginBottom: '0.8rem' }}>Expense log</h4>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.875rem'}}>
                    <thead>
                      <tr style={{borderBottom:'2px solid #e5e7eb'}}>
                        <th style={{textAlign:'left',padding:'0.5rem 1rem',color:'#6b7280',fontWeight:'600',fontSize:'0.75rem',textTransform:'uppercase'}}>Description</th>
                        <th style={{textAlign:'left',padding:'0.5rem 1rem',color:'#6b7280',fontWeight:'600',fontSize:'0.75rem',textTransform:'uppercase'}}>Category</th>
                        <th style={{textAlign:'right',padding:'0.5rem 1rem',color:'#6b7280',fontWeight:'600',fontSize:'0.75rem',textTransform:'uppercase'}}>Amount</th>
                        <th style={{padding:'0.5rem'}}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {plan.expenses.map(e => (
                        <tr key={e._id} style={{borderBottom:'1px solid #f0f0f0'}}>
                          <td style={{padding:'0.75rem 1rem',color:'#111827'}}>{e.description}</td>
                          <td style={{padding:'0.75rem 1rem'}}>
                            <span style={{background:'#e8f4fd',color:'#0077b6',padding:'0.2rem 0.6rem',borderRadius:'20px',fontSize:'0.75rem'}}>{e.category}</span>
                          </td>
                          <td style={{padding:'0.75rem 1rem',textAlign:'right',fontWeight:'600',color:'#111827'}}>${e.amount.toFixed(2)}</td>
                          <td style={{padding:'0.75rem',textAlign:'right'}}>
                            <button onClick={() => deleteExpense(e._id)} style={{background:'none',border:'none',color:'#dc3545',cursor:'pointer'}}>✕</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{borderTop:'2px solid #e5e7eb',background:'#f9fafb'}}>
                        <td colSpan="2" style={{padding:'0.75rem 1rem',fontWeight:'600',color:'#374151'}}>Total</td>
                        <td style={{padding:'0.75rem 1rem',textAlign:'right',fontWeight:'700',color:'#0077b6'}}>${plan.expenses.reduce((s,e) => s + e.amount, 0).toFixed(2)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
              </div>
            )}
          </div>
        )}

        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Saved Places ({plan.destinations?.length || 0})</h2>
        {plan.destinations?.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '12px', color: '#888' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📌</div>
            <h3 style={{ marginBottom: '0.5rem' }}>No places added yet</h3>
            <p>Go to Destinations and click "Add to Plan" to save places here!</p>
            <button onClick={() => navigate('/destinations')} style={{ marginTop: '1rem', padding: '0.7rem 1.5rem', background: '#0077b6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Browse Destinations
            </button>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {plan.destinations?.map((place) => (
            <div key={place._id} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              {place.photo ? (
                <img src={place.photo} alt={place.name} style={{ width: '100%', height: '160px', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
              ) : (
                <div style={{ width: '100%', height: '160px', background: 'linear-gradient(135deg, #0077b6, #00b4d8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '2.5rem' }}>🌍</span>
                </div>
              )}
              <div style={{ padding: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', color: '#333', marginBottom: '0.3rem' }}>{place.name}</h3>
                <p style={{ color: '#888', fontSize: '0.78rem', marginBottom: '0.6rem' }}>{place.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {place.rating && <span style={{ background: '#fff3cd', color: '#856404', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.78rem' }}>⭐ {place.rating}</span>}
                  <button onClick={() => removeDestination(place._id)} style={{ background: '#fff', color: '#dc3545', border: '1px solid #dc3545', padding: '0.3rem 0.7rem', borderRadius: '20px', fontSize: '0.78rem', cursor: 'pointer' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PlanDetail;
