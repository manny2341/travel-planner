import { toast } from "sonner";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Star, TrendingUp, DollarSign, Filter, Search } from "lucide-react";
import { destinations as staticDestinations } from "../data/index";
import { DestinationCard } from "../components/Cards";
import { SearchForm } from "../components/Forms";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { API_BASE } from "../lib/api";

const categories = [
  { value: "all", label: "All Destinations" },
  { value: "beach", label: "Beach" },
  { value: "city", label: "City" },
  { value: "mountain", label: "Mountain" },
  { value: "cultural", label: "Cultural" },
  { value: "adventure", label: "Adventure" },
];

const PRICE_BY_LEVEL = { 0: 0, 1: 300, 2: 700, 3: 1200, 4: 2000 };

function mapPlaceToDestination(place) {
  const parts = (place.address || '').split(',');
  return {
    id: place.id,
    name: place.name,
    location: parts.slice(0, 2).join(',').trim() || 'Unknown',
    country: parts[parts.length - 1]?.trim() || 'Unknown',
    price: PRICE_BY_LEVEL[place.price_level] ?? 800,
    rating: place.rating || 4.0,
    reviewCount: place.user_ratings_total || 0,
    category: 'cultural',
    image: place.photo || 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800',
    description: `Explore ${place.name}, one of the most popular destinations.`,
    tags: (place.types || [])
      .filter(t => !['establishment', 'point_of_interest'].includes(t))
      .slice(0, 3)
      .map(t => t.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
  };
}

export default function Destinations() {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [apiResults, setApiResults] = useState(null); // null = not searched
  const [apiLoading, setApiLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) { setSearchQuery(q); triggerSearch(q); }
    if (cat) setCategoryFilter(cat);
  }, [searchParams]);

  const triggerSearch = useCallback(async (q) => {
    if (!q || q.trim().length < 2) { setApiResults(null); return; }
    setApiLoading(true);
    setCurrentPage(1);
    try {
      const res = await fetch(`${API_BASE}/api/destinations/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Search failed");
      setApiResults(Array.isArray(data) ? data.map(mapPlaceToDestination) : []);
    } catch (err) {
      toast.error(err.message || "Search failed");
      setApiResults(null);
    }
    setApiLoading(false);
  }, []);

  const handleSearch = (filters) => {
    const q = filters.location || "";
    setSearchQuery(q);
    if (q) {
      triggerSearch(q);
    } else {
      setApiResults(null);
      setCurrentPage(1);
    }
  };

  // Use API results when available, otherwise static data
  const baseDestinations = apiResults !== null ? apiResults : staticDestinations;

  const filteredDestinations = useMemo(() => {
    let filtered = [...baseDestinations];

    // Category filter only applies to static data
    if (apiResults === null && categoryFilter !== "all") {
      filtered = filtered.filter(dest => dest.category === categoryFilter);
    }

    switch (sortBy) {
      case "price-low": filtered.sort((a, b) => a.price - b.price); break;
      case "price-high": filtered.sort((a, b) => b.price - a.price); break;
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "popularity": filtered.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return filtered;
  }, [baseDestinations, categoryFilter, sortBy, apiResults]);

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);
  const paginatedDestinations = filteredDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-16" style={{ background: 'linear-gradient(135deg, #e8f4fd, #f0f9ff)' }}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Explore Destinations</h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Discover your next adventure from our curated collection of world-class travel destinations</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <SearchForm onSearch={handleSearch} />
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              {apiResults === null && (
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Badge key={cat.value}
                      variant={categoryFilter === cat.value ? "default" : "outline"}
                      className={`cursor-pointer transition-all hover:scale-105 ${categoryFilter === cat.value ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                      onClick={() => { setCategoryFilter(cat.value); setCurrentPage(1); }}>
                      {cat.label}
                    </Badge>
                  ))}
                </div>
              )}
              {apiResults !== null && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-600 flex items-center gap-1">
                    <Search className="w-4 h-4" /> Results for "{searchQuery}"
                  </span>
                  <button onClick={() => { setApiResults(null); setSearchQuery(""); setCurrentPage(1); }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline">Clear search</button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">{filteredDestinations.length} destinations found</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity"><TrendingUp className="w-4 h-4" /> Popularity</SelectItem>
                  <SelectItem value="rating"><Star className="w-4 h-4" /> Rating</SelectItem>
                  <SelectItem value="price-low"><DollarSign className="w-4 h-4" /> Price: Low to High</SelectItem>
                  <SelectItem value="price-high"><DollarSign className="w-4 h-4" /> Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {apiLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              <p className="mt-4 text-gray-500">Searching destinations...</p>
            </div>
          ) : paginatedDestinations.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
              <p className="text-gray-400">Try adjusting your filters or search criteria</p>
            </motion.div>
          ) : (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {paginatedDestinations.map((destination, index) => (
                  <motion.div key={destination.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <DestinationCard destination={destination} />
                  </motion.div>
                ))}
              </motion.div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <Button variant="outline" onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1}
                    className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50">
                    Previous
                  </Button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button key={page} onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages}
                    className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50">
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
