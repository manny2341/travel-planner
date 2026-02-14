import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'sonner';
import { API_BASE } from '../lib/api';

export default function CheckoutForm({ amount, description, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'usd', description })
      });

      const { clientSecret } = await res.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        onSuccess?.(paymentIntent);
      }
    } catch (err) {
      toast.error('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem', fontWeight: '500' }}>
          Card Details
        </label>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem', background: '#fff' }}>
          <CardElement options={{
            style: {
              base: { fontSize: '16px', color: '#374151', '::placeholder': { color: '#9ca3af' } },
              invalid: { color: '#dc2626' }
            }
          }} />
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.5rem' }}>
          Test card: 4242 4242 4242 4242 | Any future date | Any CVC
        </p>
      </div>

      <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>{description}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.1rem' }}>
          <span>Total</span>
          <span style={{ color: '#0077b6' }}>${amount}</span>
        </div>
      </div>

      <button type="submit" disabled={!stripe || loading}
        style={{
          width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none',
          background: loading ? '#93c5fd' : '#0077b6', color: '#fff',
          fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer'
        }}>
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </form>
  );
}
