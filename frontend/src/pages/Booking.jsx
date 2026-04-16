import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Plane, Hotel as HotelIcon, Search } from "lucide-react";
import { sampleHotels } from "../data/index";
import { FlightCard, HotelCard } from "../components/Cards";
import { BookingFilterForm } from "../components/Forms";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { API_BASE } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const AIRPORT_CITIES = {
  LHR: "London", LGW: "London", STN: "London", CDG: "Paris", ORY: "Paris",
  JFK: "New York", LAX: "Los Angeles", DXB: "Dubai", AMS: "Amsterdam",
  BCN: "Barcelona", MAD: "Madrid", FCO: "Rome", MXP: "Milan",
  NRT: "Tokyo", SYD: "Sydney", SIN: "Singapore", BKK: "Bangkok",
  MAN: "Manchester", EDI: "Edinburgh", BHX: "Birmingham"
};

function mapFlight(f) {
  const dep = new Date(f.departure);
  const arr = new Date(f.arrival);
  const mins = Math.round((arr - dep) / 60000);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return {
    ...f,
    flightNumber: f.id,
    duration: `${h}h ${m > 0 ? m + "m" : ""}`.trim(),
    class: "economy",
    departure: {
      time: dep.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      city: AIRPORT_CITIES[f.origin] || f.origin,
      airport: f.origin,
      date: dep.toLocaleDateString("en-GB")
    },
    arrival: {
      time: arr.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      city: AIRPORT_CITIES[f.destination] || f.destination,
      airport: f.destination,
      date: arr.toLocaleDateString("en-GB")
    }
  };
}

function AirportInput({ label, value, onChange }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (e) => {
    const q = e.target.value;
    setQuery(q);
    clearTimeout(timer.current);
    if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`${API_BASE}/api/booking/airports?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        setSuggestions(data);
        setOpen(data.length > 0);
      } catch { /* ignore */ }
    }, 250);
  };

  const select = (airport) => {
    setQuery(`${airport.name} (${airport.id})`);
    onChange(airport.id);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className="relative flex-1 min-w-40" ref={wrapperRef}>
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInput}
        placeholder="Search airport..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {open && (
        <ul className="absolute z-50 top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
          {suggestions.map((a) => (
            <li key={a.id} onClick={() => select(a)}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm">
              <span className="font-medium">{a.id}</span>
              <span className="text-gray-500 ml-2">{a.name}</span>
              <span className="text-gray-400 text-xs ml-1">— {a.subtitle}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PaymentForm({ amount, description, itemType, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!user || !token) { toast.error("Please sign in to complete your booking"); return; }
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
        await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            type: itemType || "other",
            title: description,
            amount,
            currency: "USD",
            payment_intent_id: paymentIntent.id,
            details: {}
          })
        });
        toast.success("Payment successful! Booking confirmed.");
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
      <button type="submit" disabled={!stripe || loading}
        style={{ width: "100%", padding: "0.875rem", borderRadius: "8px", border: "none", background: loading ? "#93c5fd" : "#0077b6", color: "#fff", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}>
        {loading ? "Processing..." : "Pay $" + amount}
      </button>
    </form>
  );
}

export default function Booking() {
  const [activeTab, setActiveTab] = useState("flights");
  const [hotelFilters, setHotelFilters] = useState({ minPrice: 0, maxPrice: 1000, sortBy: "price" });
  const [paymentItem, setPaymentItem] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Flight search state
  const [fromCode, setFromCode] = useState("");
  const [toCode, setToCode] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [searchedFlights, setSearchedFlights] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [flightFilters, setFlightFilters] = useState({ minPrice: 0, maxPrice: 2000, sortBy: "price" });

  const handleFlightSearch = async (e) => {
    e.preventDefault();
    if (!fromCode || !toCode || !flightDate) { toast.error("Please fill in all search fields"); return; }
    setSearchLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/booking/flights?from=${fromCode}&to=${toCode}&date=${flightDate}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Search failed");
      setSearchedFlights(data.map(mapFlight));
    } catch (err) {
      toast.error(err.message || "Flight search failed");
    }
    setSearchLoading(false);
  };

  const displayFlights = searchedFlights !== null
    ? searchedFlights.filter(f => f.price >= flightFilters.minPrice && f.price <= flightFilters.maxPrice)
    : [];

  const filteredHotels = sampleHotels.filter(h => h.price >= hotelFilters.minPrice && h.price <= hotelFilters.maxPrice);

  const handleClose = () => { setPaymentItem(null); setPaymentSuccess(false); };

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

          <TabsContent value="flights" className="space-y-6">
            {/* Flight Search Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Search Flights</h3>
              <form onSubmit={handleFlightSearch} className="flex flex-wrap gap-4 items-end">
                <AirportInput label="From" value={fromCode} onChange={setFromCode} />
                <AirportInput label="To" value={toCode} onChange={setToCode} />
                <div className="flex-1 min-w-36">
                  <label className="text-sm text-gray-500 block mb-1">Date</label>
                  <input
                    type="date"
                    value={flightDate}
                    onChange={e => setFlightDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button type="submit" disabled={searchLoading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 h-[38px]">
                  <Search className="w-4 h-4" /> {searchLoading ? "Searching..." : "Search"}
                </button>
              </form>
            </div>

            {searchedFlights !== null && (
              <>
                <BookingFilterForm type="flights" onFilter={setFlightFilters} />
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Available Flights <span className="text-gray-400">({displayFlights.length})</span>
                  </h2>
                  {displayFlights.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">
                      No flights found matching your filters.
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      {displayFlights.map(flight => (
                        <div key={flight.id}>
                          <FlightCard flight={flight} />
                          <Button
                            onClick={() => setPaymentItem({ type: "flight", name: `${flight.airline} — ${flight.departure.airport} → ${flight.arrival.airport}`, amount: flight.price })}
                            className="w-full mt-3" size="lg">
                            Book Now — ${flight.price}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {searchedFlights === null && (
              <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-200">
                <Plane className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Search for flights above to see available options</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hotels" className="space-y-8">
            <BookingFilterForm type="hotels" onFilter={setHotelFilters} />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Available Hotels <span className="text-gray-400">({filteredHotels.length})</span></h2>
              <div className="grid gap-6 md:grid-cols-2">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id}>
                    <HotelCard hotel={hotel} />
                    <Button
                      onClick={() => setPaymentItem({ type: "hotel", name: hotel.name, amount: hotel.price })}
                      className="w-full mt-3" size="lg">
                      Book Now — ${hotel.price}/night
                    </Button>
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
              <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>Your booking is confirmed and saved to your account.</p>
              <button onClick={handleClose} style={{ background: "#0077b6", color: "#fff", border: "none", padding: "0.75rem 2rem", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>Done</button>
            </div>
          ) : paymentItem ? (
            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={paymentItem.amount}
                description={paymentItem.name}
                itemType={paymentItem.type}
                onSuccess={() => setPaymentSuccess(true)}
              />
            </Elements>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
