import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel as HotelIcon, Star, Wifi, Utensils, Dumbbell, Coffee, Car, Users } from "lucide-react";
import { sampleFlights, sampleHotels } from "../data/index";
import { FlightCard, HotelCard } from "../components/Cards";
import { BookingFilterForm } from "../components/Forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { API_BASE } from "../lib/api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function PaymentForm({ amount, description, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency: "usd", description })
      });
      const data = await res.json();
      const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      });
      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
        const booking = {
          id: paymentIntent.id,
          type: description,
          amount,
          date: new Date().toISOString(),
          status: "confirmed"
        };
        const existing = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
        localStorage.setItem('bookingHistory', JSON.stringify([booking, ...existing]));
        onSuccess();
      }
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handlePay} style={{ padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.875rem", color: "#374151", marginBottom: "0.5rem", fontWeight: "500" }}>Card Details</label>
        <div style={{ border: "1px solid #e5e7eb", borderRadius: "8px", padding: "0.75rem", background: "#fff" }}>
          <CardElement options={{ style: { base: { fontSize: "16px", color: "#374151", "::placeholder": { color: "#9ca3af" } }, invalid: { color: "#dc2626" } } }} />
        </div>
        <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.5rem" }}>Test: 4242 4242 4242 4242 | Any future date | Any CVC</p>
      </div>
      <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "1.1rem" }}>
          <span>Total</span>
          <span style={{ color: "#0077b6" }}>${amount}</span>
        </div>
      </div>
      <button type="submit" disabled={!stripe || loading} style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "none", background: loading ? "#93c5fd" : "#0077b6", color: "#fff", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Processing..." : "Pay $" + amount}
      </button>
    </form>
  );
}

export default function Booking() {
  const [activeTab, setActiveTab] = useState("flights");
  const [flightFilters, setFlightFilters] = useState({ minPrice: 0, maxPrice: 2000, sortBy: "price" });
  const [hotelFilters, setHotelFilters] = useState({ minPrice: 0, maxPrice: 1000, sortBy: "price" });
  const [paymentItem, setPaymentItem] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredFlights = sampleFlights.filter(f => f.price >= flightFilters.minPrice && f.price <= flightFilters.maxPrice);
  const filteredHotels = sampleHotels.filter(h => h.price >= hotelFilters.minPrice && h.price <= hotelFilters.maxPrice);

  const handleClose = () => {
    setPaymentItem(null);
    setPaymentSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ height: "280px", backgroundImage: "url(https://images.unsplash.com/photo-1771694583915-78f9b39fd6d1?w=1080)", backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)" }} />
        <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 1rem" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", color: "#fff", marginBottom: "0.75rem" }}>Book Your Journey</h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.85)", maxWidth: "600px" }}>Find the perfect flights and hotels for your next adventure</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14">
            <TabsTrigger value="flights" className="text-base flex items-center gap-2">
              <Plane className="w-5 h-5" /> Flights
            </TabsTrigger>
            <TabsTrigger value="hotels" className="text-base flex items-center gap-2">
              <HotelIcon className="w-5 h-5" /> Hotels
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights" className="space-y-8">
            <BookingFilterForm type="flights" onFilter={setFlightFilters} />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Flights <span className="text-gray-400">({filteredFlights.length})</span></h2>
              <div className="grid gap-6">
                {filteredFlights.map(flight => (
                  <div key={flight.id}>
                    <FlightCard flight={flight} />
                    <Button onClick={() => setPaymentItem({ type: "flight", name: flight.airline + " " + flight.flightNumber, amount: flight.price })} className="w-full mt-3" size="lg">Book Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hotels" className="space-y-8">
            <BookingFilterForm type="hotels" onFilter={setHotelFilters} />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Hotels <span className="text-gray-400">({filteredHotels.length})</span></h2>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id}>
                    <HotelCard hotel={hotel} />
                    <Button onClick={() => setPaymentItem({ type: "hotel", name: hotel.name, amount: hotel.price })} className="w-full mt-3" size="lg">Book Now</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!paymentItem} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{paymentSuccess ? "Booking Confirmed!" : "Complete Your Booking"}</DialogTitle>
            <DialogDescription>{paymentItem && paymentItem.name}</DialogDescription>
          </DialogHeader>
          {paymentSuccess ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#059669", marginBottom: "0.5rem" }}>Payment Successful!</h3>
              <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Your booking is confirmed.</p>
              <button onClick={handleClose} style={{ background: "#0077b6", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Done</button>
            </div>
          ) : paymentItem ? (
            <Elements stripe={stripePromise}>
              <PaymentForm amount={paymentItem.amount} description={paymentItem.name} onSuccess={() => setPaymentSuccess(true)} />
            </Elements>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
