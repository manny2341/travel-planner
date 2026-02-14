import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Plans from './pages/Plans';
import PlanDetail from './pages/PlanDetail';
import Booking from './pages/Booking';
import BookingHistory from './pages/BookingHistory';
import BudgetCalculator from './pages/BudgetCalculator';
import Reviews from './pages/Reviews';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Toaster position="top-right" richColors />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destinations/:id" element={<DestinationDetail />} />
              <Route path="/plans" element={<ProtectedRoute><Plans /></ProtectedRoute>} />
              <Route path="/plans/:id" element={<ProtectedRoute><PlanDetail /></ProtectedRoute>} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/bookings" element={<ProtectedRoute><BookingHistory /></ProtectedRoute>} />
              <Route path="/budget" element={<BudgetCalculator />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;
