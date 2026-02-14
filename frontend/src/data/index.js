export const IMAGES = {
  DESTINATIONS_1: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
  DESTINATIONS_2: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
  DESTINATIONS_3: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800",
  DESTINATIONS_4: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
  DESTINATIONS_5: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
  DESTINATIONS_6: "https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800",
  DESTINATIONS_7: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800",
  DESTINATIONS_8: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
  HOTEL_BOOKING_1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  HOTEL_BOOKING_2: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  HOTEL_BOOKING_3: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  HOTEL_BOOKING_4: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
  HOTEL_BOOKING_5: "https://images.unsplash.com/photo-1509647924673-bbb53e22eeb8?w=800",
  HOTEL_BOOKING_6: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a?w=800",
  HOTEL_BOOKING_7: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  HOTEL_BOOKING_8: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
};

export const destinations = [
  {
    id: "dest-1", name: "Santorini", location: "Cyclades Islands", country: "Greece",
    description: "Experience the iconic white-washed buildings and stunning sunsets over the Aegean Sea. Santorini offers breathtaking caldera views, volcanic beaches, and world-class cuisine.",
    image: IMAGES.DESTINATIONS_1, price: 1200, rating: 4.8, reviewCount: 2847, category: "beach",
    tags: ["Romance", "Beach", "Views", "Food"], highlights: ["Caldera Views", "Sunset in Oia", "Volcanic Beaches", "Wine Tasting", "Ancient Ruins"]
  },
  {
    id: "dest-2", name: "Tokyo", location: "Kanto Region", country: "Japan",
    description: "Immerse yourself in the perfect blend of ancient tradition and cutting-edge technology. From serene temples to neon-lit streets, Tokyo offers endless discoveries.",
    image: IMAGES.DESTINATIONS_2, price: 1500, rating: 4.9, reviewCount: 3521, category: "city",
    tags: ["Technology", "Food", "Culture", "Shopping"], highlights: ["Shibuya Crossing", "Senso-ji Temple", "Mount Fuji Views", "Cherry Blossoms", "Tsukiji Market"]
  },
  {
    id: "dest-3", name: "Machu Picchu", location: "Cusco Region", country: "Peru",
    description: "Discover the ancient Incan citadel perched high in the Andes Mountains. This UNESCO World Heritage site offers mystical ruins and spectacular mountain scenery.",
    image: IMAGES.DESTINATIONS_3, price: 900, rating: 4.9, reviewCount: 1923, category: "mountain",
    tags: ["Adventure", "History", "Hiking", "Culture"], highlights: ["Inca Trail", "Sun Gate", "Huayna Picchu", "Sacred Valley", "Andean Culture"]
  },
  {
    id: "dest-4", name: "Bali", location: "Indonesian Archipelago", country: "Indonesia",
    description: "Paradise island known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. Experience spiritual temples and vibrant culture.",
    image: IMAGES.DESTINATIONS_4, price: 800, rating: 4.7, reviewCount: 4156, category: "beach",
    tags: ["Beach", "Culture", "Wellness", "Nature"], highlights: ["Ubud Rice Terraces", "Beach Clubs", "Temple Tours", "Surfing", "Balinese Cuisine"]
  },
  {
    id: "dest-5", name: "Paris", location: "Île-de-France", country: "France",
    description: "The City of Light captivates with its art, architecture, and romance. From the Eiffel Tower to charming cafés, Paris embodies timeless elegance.",
    image: IMAGES.DESTINATIONS_5, price: 1400, rating: 4.8, reviewCount: 5234, category: "city",
    tags: ["Romance", "Art", "Food", "History"], highlights: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Seine River Cruise", "Montmartre"]
  },
  {
    id: "dest-6", name: "Patagonia", location: "Southern Region", country: "Argentina & Chile",
    description: "Explore dramatic landscapes of glaciers, mountains, and pristine wilderness. Patagonia offers unparalleled adventure and natural beauty at the end of the world.",
    image: IMAGES.DESTINATIONS_6, price: 1600, rating: 4.9, reviewCount: 1456, category: "adventure",
    tags: ["Adventure", "Hiking", "Nature", "Wildlife"], highlights: ["Perito Moreno Glacier", "Torres del Paine", "Hiking Trails", "Wildlife Watching", "Fjords"]
  },
  {
    id: "dest-7", name: "Marrakech", location: "Marrakech-Safi", country: "Morocco",
    description: "Step into a world of vibrant souks, stunning palaces, and aromatic spice markets. Marrakech enchants with its rich history and exotic atmosphere.",
    image: IMAGES.DESTINATIONS_7, price: 700, rating: 4.6, reviewCount: 2789, category: "cultural",
    tags: ["Culture", "History", "Food", "Shopping"], highlights: ["Jemaa el-Fnaa", "Bahia Palace", "Majorelle Garden", "Medina Souks", "Sahara Desert Tours"]
  },
  {
    id: "dest-8", name: "Iceland", location: "Nordic Island", country: "Iceland",
    description: "Land of fire and ice featuring dramatic volcanic landscapes, geothermal hot springs, and the magical Northern Lights. Nature's raw power on full display.",
    image: IMAGES.DESTINATIONS_8, price: 1800, rating: 4.9, reviewCount: 2134, category: "adventure",
    tags: ["Adventure", "Nature", "Northern Lights", "Hiking"], highlights: ["Northern Lights", "Blue Lagoon", "Golden Circle", "Waterfalls", "Glaciers"]
  },
  {
    id: "dest-9", name: "New York City", location: "New York", country: "United States",
    description: "The city that never sleeps — iconic skyline, world-class museums, and endless entertainment.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    price: 1600, rating: 4.7, reviewCount: 22100, category: "city",
    tags: ["Culture", "Food", "Shopping", "Entertainment"], highlights: ["Times Square", "Central Park", "Broadway", "Statue of Liberty", "Brooklyn Bridge"]
  },
  {
    id: "dest-10", name: "Kyoto", location: "Kansai", country: "Japan",
    description: "Japan's cultural heart with over 1,600 Buddhist temples, traditional geisha districts and stunning gardens.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
    price: 1300, rating: 4.9, reviewCount: 11400, category: "cultural",
    tags: ["Culture", "History", "Temples", "Nature"], highlights: ["Fushimi Inari", "Arashiyama Bamboo", "Gion District", "Kinkaku-ji", "Tea Ceremony"]
  },
  {
    id: "dest-11", name: "Maldives", location: "South Asia", country: "Maldives",
    description: "A tropical paradise of overwater bungalows, crystal lagoons and vibrant coral reefs.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800",
    price: 3000, rating: 4.9, reviewCount: 8900, category: "beach",
    tags: ["Beach", "Luxury", "Romance", "Diving"], highlights: ["Overwater Bungalows", "Snorkeling", "Dolphin Watching", "Sunset Cruises", "Coral Reefs"]
  },
  {
    id: "dest-12", name: "Swiss Alps", location: "Valais", country: "Switzerland",
    description: "Breathtaking mountain scenery, world-class skiing and charming alpine villages.",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800",
    price: 2200, rating: 4.8, reviewCount: 6200, category: "mountain",
    tags: ["Skiing", "Nature", "Hiking", "Luxury"], highlights: ["Matterhorn", "Ski Resorts", "Alpine Villages", "Glacier Express", "Chocolate Tasting"]
  }
];

export const sampleFlights = [
  {
    id: "flight-1", airline: "Emirates", flightNumber: "EK203",
    departure: { airport: "JFK", city: "New York", time: "22:30", date: "2026-06-15" },
    arrival: { airport: "ATH", city: "Athens", time: "16:45", date: "2026-06-16" },
    duration: "10h 15m", price: 850, currency: "USD", class: "economy", stops: 1,
    amenities: ["In-flight Entertainment", "Meals Included", "WiFi Available", "Power Outlets"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/EK.png"
  },
  {
    id: "flight-2", airline: "Japan Airlines", flightNumber: "JL006",
    departure: { airport: "LAX", city: "Los Angeles", time: "11:50", date: "2026-07-20" },
    arrival: { airport: "NRT", city: "Tokyo", time: "15:35", date: "2026-07-21" },
    duration: "11h 45m", price: 1200, currency: "USD", class: "premium-economy", stops: 0,
    amenities: ["Extra Legroom", "Priority Boarding", "Premium Meals", "Noise-Canceling Headphones"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/JL.png"
  },
  {
    id: "flight-3", airline: "LATAM Airlines", flightNumber: "LA2476",
    departure: { airport: "MIA", city: "Miami", time: "23:55", date: "2026-08-10" },
    arrival: { airport: "LIM", city: "Lima", time: "05:20", date: "2026-08-11" },
    duration: "5h 25m", price: 450, currency: "USD", class: "economy", stops: 0,
    amenities: ["Snacks & Beverages", "In-flight Entertainment", "USB Charging"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/LA.png"
  },
  {
    id: "flight-4", airline: "Singapore Airlines", flightNumber: "SQ25",
    departure: { airport: "SFO", city: "San Francisco", time: "13:30", date: "2026-09-05" },
    arrival: { airport: "DPS", city: "Bali", time: "22:15", date: "2026-09-06" },
    duration: "17h 45m", price: 980, currency: "USD", class: "economy", stops: 1,
    amenities: ["Award-Winning Service", "Full Meals", "Entertainment System", "Amenity Kit"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/SQ.png"
  },
  {
    id: "flight-5", airline: "Air France", flightNumber: "AF083",
    departure: { airport: "JFK", city: "New York", time: "18:20", date: "2026-10-12" },
    arrival: { airport: "CDG", city: "Paris", time: "07:55", date: "2026-10-13" },
    duration: "7h 35m", price: 750, currency: "USD", class: "economy", stops: 0,
    amenities: ["Gourmet Meals", "Premium Wine Selection", "Entertainment", "Comfort Kit"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/AF.png"
  },
  {
    id: "flight-6", airline: "British Airways", flightNumber: "BA117",
    departure: { airport: "LHR", city: "London", time: "09:15", date: "2026-11-20" },
    arrival: { airport: "GRU", city: "Sao Paulo", time: "18:40", date: "2026-11-20" },
    duration: "11h 25m", price: 920, currency: "USD", class: "business", stops: 0,
    amenities: ["Lie-Flat Seats", "Champagne", "Lounge Access", "Priority Boarding"],
    airlineLogo: "https://logos.skyscnr.com/images/airlines/favicon/BA.png"
  }
];

export const sampleHotels = [
  {
    id: "hotel-1", name: "Canaves Oia Epitome", location: "Oia", city: "Santorini", country: "Greece",
    image: IMAGES.HOTEL_BOOKING_1, rating: 4.9, reviewCount: 1245, price: 450, currency: "USD",
    priceUnit: "night", amenities: ["Infinity Pool", "Caldera Views", "Spa", "Fine Dining", "Concierge"],
    roomType: "Cave Suite with Pool", checkIn: "14:00", checkOut: "11:00",
    description: "Perched on the cliffs of Oia, this iconic hotel features cave suites carved into the volcanic rock with stunning caldera and sunset views."
  },
  {
    id: "hotel-2", name: "The Peninsula Tokyo", location: "Marunouchi", city: "Tokyo", country: "Japan",
    image: IMAGES.HOTEL_BOOKING_2, rating: 4.9, reviewCount: 2156, price: 550, currency: "USD",
    priceUnit: "night", amenities: ["Spa", "Rooftop Bar", "Multiple Restaurants", "Fitness Center", "Butler Service"],
    roomType: "Deluxe Room", checkIn: "15:00", checkOut: "12:00",
    description: "The pinnacle of luxury in Tokyo, combining Japanese aesthetics with Peninsula's legendary service. Features stunning views of the Imperial Palace Gardens."
  },
  {
    id: "hotel-3", name: "Inkaterra Machu Picchu", location: "Historic Sanctuary", city: "Aguas Calientes", country: "Peru",
    image: IMAGES.HOTEL_BOOKING_3, rating: 4.8, reviewCount: 987, price: 320, currency: "USD",
    priceUnit: "night", amenities: ["Guided Tours", "Organic Restaurant", "Spa", "Cloud Forest", "Orchid Garden"],
    roomType: "Deluxe Room", checkIn: "14:00", checkOut: "11:00",
    description: "The only hotel located at the entrance to Machu Picchu, offering unparalleled access to the ancient citadel and stunning mountain vistas."
  },
  {
    id: "hotel-4", name: "Four Seasons Resort Bali", location: "Jimbaran Bay", city: "Bali", country: "Indonesia",
    image: IMAGES.HOTEL_BOOKING_4, rating: 4.9, reviewCount: 3421, price: 350, currency: "USD",
    priceUnit: "night", amenities: ["Private Beach", "Infinity Pool", "Spa", "Kids Club", "Water Sports"],
    roomType: "Ocean View Villa", checkIn: "15:00", checkOut: "12:00",
    description: "Beachfront luxury resort featuring traditional Balinese architecture, private villas with plunge pools, and world-class amenities overlooking Jimbaran Bay."
  },
  {
    id: "hotel-5", name: "Le Meurice", location: "1st Arrondissement", city: "Paris", country: "France",
    image: IMAGES.HOTEL_BOOKING_5, rating: 4.8, reviewCount: 1876, price: 650, currency: "USD",
    priceUnit: "night", amenities: ["Michelin-Star Restaurant", "Spa", "Fitness Center", "Concierge", "Valet"],
    roomType: "Deluxe Room", checkIn: "15:00", checkOut: "12:00",
    description: "Palatial hotel facing the Tuileries Garden, combining 18th-century elegance with modern luxury. Home to a two-Michelin-star restaurant by Alain Ducasse."
  },
  {
    id: "hotel-6", name: "Explora Patagonia", location: "Torres del Paine", city: "Puerto Natales", country: "Chile",
    image: IMAGES.HOTEL_BOOKING_6, rating: 4.9, reviewCount: 567, price: 800, currency: "USD",
    priceUnit: "night", amenities: ["All-Inclusive", "Guided Excursions", "Spa", "Gourmet Dining", "Panoramic Views"],
    roomType: "Suite with Lake View", checkIn: "14:00", checkOut: "11:00",
    description: "All-inclusive luxury lodge in Torres del Paine National Park, offering immersive exploration programs and stunning views of the Patagonian landscape."
  },
  {
    id: "hotel-7", name: "La Mamounia", location: "Medina", city: "Marrakech", country: "Morocco",
    image: IMAGES.HOTEL_BOOKING_7, rating: 4.8, reviewCount: 2341, price: 420, currency: "USD",
    priceUnit: "night", amenities: ["Historic Gardens", "Multiple Pools", "Spa", "Fine Dining", "Fitness Center"],
    roomType: "Deluxe Room", checkIn: "15:00", checkOut: "12:00",
    description: "Legendary palace hotel set in 20 acres of gardens, blending Moroccan tradition with Art Deco elegance. A favourite of Winston Churchill."
  },
  {
    id: "hotel-8", name: "The Retreat at Blue Lagoon", location: "Grindavik", city: "Reykjavik", country: "Iceland",
    image: IMAGES.HOTEL_BOOKING_8, rating: 4.9, reviewCount: 1123, price: 950, currency: "USD",
    priceUnit: "night", amenities: ["Private Lagoon", "Spa", "Geothermal Pool", "Fine Dining", "Northern Lights Views"],
    roomType: "Lagoon Suite", checkIn: "16:00", checkOut: "12:00",
    description: "Ultra-luxury hotel built into an 800-year-old lava flow, featuring exclusive access to a private geothermal lagoon and subterranean spa."
  }
];

export const sampleReviews = [
  {
    id: "review-1", userId: "user-1", userName: "Sarah Mitchell",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    destinationId: "dest-1", destinationName: "Santorini", rating: 5,
    title: "Absolutely Magical Experience",
    comment: "Santorini exceeded all expectations! The sunsets in Oia are truly breathtaking, and the local cuisine is incredible. We stayed in a cave hotel with a private pool overlooking the caldera. The volcanic beaches are unique and the wine tasting tours were a highlight. Can't wait to return!",
    helpful: 127, createdAt: "2026-02-15T10:30:00Z", verified: true
  },
  {
    id: "review-2", userId: "user-2", userName: "James Chen",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    destinationId: "dest-2", destinationName: "Tokyo", rating: 5,
    title: "Perfect Blend of Tradition and Modernity",
    comment: "Tokyo is an incredible city that seamlessly blends ancient temples with futuristic technology. The food scene is unmatched. The cherry blossoms in spring were stunning. Public transportation is efficient and the people are incredibly helpful. A must-visit destination!",
    helpful: 203, createdAt: "2026-03-10T14:20:00Z", verified: true
  },
  {
    id: "review-3", userId: "user-3", userName: "Maria Rodriguez",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    destinationId: "dest-3", destinationName: "Machu Picchu", rating: 5,
    title: "Bucket List Achievement",
    comment: "Hiking the Inca Trail to Machu Picchu was the adventure of a lifetime. The ancient ruins are awe-inspiring and the mountain scenery is spectacular. Arriving at the Sun Gate at sunrise was an unforgettable moment. Highly recommend booking well in advance!",
    helpful: 156, createdAt: "2026-01-22T09:15:00Z", verified: true
  },
  {
    id: "review-4", userId: "user-4", userName: "David Thompson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    destinationId: "dest-4", destinationName: "Bali", rating: 4,
    title: "Paradise Island with Great Culture",
    comment: "Bali offers something for everyone — beautiful beaches, lush rice terraces, ancient temples and vibrant culture. Ubud was our favourite area for its art scene and yoga retreats. The food is amazing and very affordable. An incredible destination for relaxation and adventure.",
    helpful: 189, createdAt: "2026-02-28T16:45:00Z", verified: true
  },
  {
    id: "review-5", userId: "user-5", userName: "Emma Laurent",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    destinationId: "dest-5", destinationName: "Paris", rating: 5,
    title: "Romance and Culture Combined",
    comment: "Paris never disappoints! From the iconic Eiffel Tower to charming Montmartre streets, every corner is photogenic. The Louvre and Musée d'Orsay are world-class. Seine river cruises at sunset are magical. The city truly lives up to its reputation as the most romantic destination.",
    helpful: 234, createdAt: "2026-03-05T11:30:00Z", verified: true
  },
  {
    id: "review-6", userId: "user-6", userName: "Michael O'Brien",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    destinationId: "dest-6", destinationName: "Patagonia", rating: 5,
    title: "Nature at Its Most Dramatic",
    comment: "Patagonia is a dream for outdoor enthusiasts. The Perito Moreno Glacier is absolutely massive and watching ice calve into the lake is mesmerizing. Torres del Paine offers some of the best hiking in the world. Wildlife spotting was incredible — we saw condors, guanacos and even a puma!",
    helpful: 142, createdAt: "2026-01-18T13:20:00Z", verified: true
  },
  {
    id: "review-7", userId: "user-7", userName: "Fatima Al-Rashid",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    destinationId: "dest-7", destinationName: "Marrakech", rating: 4,
    title: "Sensory Overload in the Best Way",
    comment: "Marrakech is a feast for the senses! The medina souks are a maze of colours, scents and sounds. Jemaa el-Fnaa square comes alive at night with food stalls and performers. The riads are beautiful oases of calm. A fascinating cultural destination!",
    helpful: 167, createdAt: "2026-02-20T15:10:00Z", verified: true
  },
  {
    id: "review-8", userId: "user-8", userName: "Lars Eriksson",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lars",
    destinationId: "dest-8", destinationName: "Iceland", rating: 5,
    title: "Land of Fire and Ice Lives Up to Its Name",
    comment: "Iceland is otherworldly! We were lucky to see the Northern Lights dancing across the sky — truly magical. The Golden Circle route showcases incredible waterfalls and geysers. Blue Lagoon was relaxing after long days of exploring. Expensive but absolutely worth it for the unique landscapes.",
    helpful: 198, createdAt: "2026-03-12T08:45:00Z", verified: true
  }
];
