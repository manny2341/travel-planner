import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, CheckCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../context/AuthContext';
import { API_BASE } from '../lib/api';

export default function BookingHistory() {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && token) fetchBookings();
    else setIsLoading(false);
  }, [user, token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); }
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE}/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      toast.error('Failed to remove booking');
    }
  };

  const isHotelBooking = (booking) => {
    const t = (booking.title || booking.type || '').toLowerCase();
    return booking.type === 'hotel' || ['hotel', 'canaves', 'peninsula', 'inkaterra', 'four seasons', 'meurice', 'explora', 'mamounia', 'retreat'].some(k => t.includes(k));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">Sign in to view bookings</h2>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">Sign In</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ height: '220px', backgroundImage: 'url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1080)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#fff', marginBottom: '0.5rem' }}>My Bookings</h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem' }}>Your confirmed flights and hotels</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            <p className="mt-4 text-gray-500">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="text-6xl mb-6">🧳</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">No bookings yet</h2>
            <p className="text-gray-400 mb-8">Your confirmed bookings will appear here after payment.</p>
            <Link to="/booking">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Browse Flights & Hotels
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</h2>
            </div>
            {bookings.map((booking, index) => (
              <motion.div key={booking.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isHotelBooking(booking) ? 'bg-purple-50' : 'bg-blue-50'}`}>
                          {isHotelBooking(booking)
                            ? <Hotel className="w-6 h-6 text-purple-600" />
                            : <Plane className="w-6 h-6 text-blue-600" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">{booking.title || booking.type}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(booking.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xl font-bold text-blue-600">${booking.amount}</p>
                          <Badge className="bg-green-50 text-green-700 border-none mt-1">
                            <CheckCircle className="w-3 h-3 mr-1" /> Confirmed
                          </Badge>
                        </div>
                        <button onClick={() => handleDelete(booking.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1" title="Remove">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
