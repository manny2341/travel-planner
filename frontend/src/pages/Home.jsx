import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, DollarSign, ArrowRight } from "lucide-react";
import { destinations } from "../data/index";
import { DestinationCard } from "../components/Cards";
import { SearchForm } from "../components/Forms";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 300, damping: 35 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    icon: MapPin,
    title: "Discover Destinations",
    description: "Explore curated travel destinations from around the world with detailed guides and insider tips."
  },
  {
    icon: Calendar,
    title: "Plan Your Journey",
    description: "Create detailed itineraries with our intuitive planner. Add activities, set dates, and organize your perfect trip."
  },
  {
    icon: DollarSign,
    title: "Budget Calculator",
    description: "Track expenses by category and stay within budget. Get real-time insights into your travel spending."
  }
];

export default function Home() {
  const navigate = useNavigate();
  const popularDestinations = destinations.slice(0, 6);

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.location) params.set('q', filters.location);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600" alt="Travel" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1), rgba(0,0,0,0.4))' }} />
        </div>

        <motion.div className="relative z-10 container mx-auto px-4 text-center" initial="initial" animate="animate" variants={staggerContainer}>
          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white" variants={fadeInUp}>
            Discover Your Next<br />
            <span className="text-blue-400">Adventure</span>
          </motion.h1>
          <motion.p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto" variants={fadeInUp}>
            Plan, budget, and book your dream vacation with our comprehensive travel platform
          </motion.p>
          <motion.div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg" variants={fadeInUp}>
            <SearchForm onSearch={handleSearch} />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Everything you need to plan the perfect trip in one place</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-8" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div className="flex justify-between items-end mb-12" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-xl text-gray-500">Explore the world's most sought-after travel locations</p>
            </div>
            <Link to="/destinations">
              <button className="hidden md:flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            {popularDestinations.map(destination => (
              <motion.div key={destination.id} variants={fadeInUp}>
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12 md:hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/destinations">
              <button className="w-full max-w-sm bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2">
                View All Destinations <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24" style={{ background: 'linear-gradient(to bottom, #eff6ff, transparent)' }}>
        <div className="container mx-auto px-4">
          <motion.div className="max-w-4xl mx-auto text-center" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Planning?</h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Create your personalized travel itinerary with our easy-to-use planner. Add destinations, activities, and manage your budget all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/plans">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                  Create Travel Plan <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/budget">
                <button className="border border-gray-200 px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                  Budget Calculator
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Travel by Category</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Find destinations that match your travel style</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 md:grid-cols-5 gap-4" initial="initial" whileInView="animate" viewport={{ once: true }} variants={staggerContainer}>
            {[
              { name: "Beach", emoji: "🏖️", value: "beach" },
              { name: "City", emoji: "🏙️", value: "city" },
              { name: "Mountain", emoji: "⛰️", value: "mountain" },
              { name: "Cultural", emoji: "🏛️", value: "cultural" },
              { name: "Adventure", emoji: "🎒", value: "adventure" }
            ].map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link to={`/destinations?category=${category.value}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-5xl mb-3">{category.emoji}</div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
