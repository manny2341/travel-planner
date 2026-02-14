import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, DollarSign, Tag } from 'lucide-react';
import { destinations } from '../data/index';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-700">Destination not found</h2>
        <button onClick={() => navigate('/destinations')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative h-96">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))' }} />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <button
            onClick={() => navigate('/destinations')}
            className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-white/20 text-white border-none capitalize">{destination.category}</Badge>
            </div>
            <h1 className="text-5xl font-bold text-white mb-2">{destination.name}</h1>
            <p className="text-white/80 flex items-center gap-1 text-lg">
              <MapPin className="w-4 h-4" /> {destination.location}, {destination.country}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">{destination.description}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Highlights</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-600 font-bold">✓</span>
                        <span className="text-gray-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {destination.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="px-4 py-1 text-sm">
                        <Tag className="w-3 h-3 mr-1" />{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="border-blue-200">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Starting from</span>
                    <span className="text-3xl font-bold text-blue-600">${destination.price}</span>
                  </div>
                  <div className="text-xs text-gray-400 text-right">per person</div>
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-lg">{destination.rating}</span>
                    <span className="text-gray-400">({destination.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <Link to="/booking">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Book This Trip
                    </button>
                  </Link>
                  <Link to="/plans">
                    <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-2">
                      Add to Plan
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Country</span>
                      <span className="font-medium">{destination.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Region</span>
                      <span className="font-medium">{destination.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium capitalize">{destination.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating</span>
                      <span className="font-medium">{destination.rating} / 5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
