const express = require('express');
const router = express.Router();

const AIRPORTS = [
  { id: 'LHR', name: 'London Heathrow', subtitle: 'London, United Kingdom' },
  { id: 'LGW', name: 'London Gatwick', subtitle: 'London, United Kingdom' },
  { id: 'STN', name: 'London Stansted', subtitle: 'London, United Kingdom' },
  { id: 'CDG', name: 'Paris Charles de Gaulle', subtitle: 'Paris, France' },
  { id: 'ORY', name: 'Paris Orly', subtitle: 'Paris, France' },
  { id: 'JFK', name: 'New York JFK', subtitle: 'New York, United States' },
  { id: 'LAX', name: 'Los Angeles International', subtitle: 'Los Angeles, United States' },
  { id: 'DXB', name: 'Dubai International', subtitle: 'Dubai, UAE' },
  { id: 'AMS', name: 'Amsterdam Schiphol', subtitle: 'Amsterdam, Netherlands' },
  { id: 'BCN', name: 'Barcelona El Prat', subtitle: 'Barcelona, Spain' },
  { id: 'MAD', name: 'Madrid Barajas', subtitle: 'Madrid, Spain' },
  { id: 'FCO', name: 'Rome Fiumicino', subtitle: 'Rome, Italy' },
  { id: 'MXP', name: 'Milan Malpensa', subtitle: 'Milan, Italy' },
  { id: 'NRT', name: 'Tokyo Narita', subtitle: 'Tokyo, Japan' },
  { id: 'SYD', name: 'Sydney Kingsford Smith', subtitle: 'Sydney, Australia' },
  { id: 'SIN', name: 'Singapore Changi', subtitle: 'Singapore' },
  { id: 'BKK', name: 'Bangkok Suvarnabhumi', subtitle: 'Bangkok, Thailand' },
  { id: 'MAN', name: 'Manchester Airport', subtitle: 'Manchester, United Kingdom' },
  { id: 'EDI', name: 'Edinburgh Airport', subtitle: 'Edinburgh, United Kingdom' },
  { id: 'BHX', name: 'Birmingham Airport', subtitle: 'Birmingham, United Kingdom' },
];

const AIRLINES = [
  { name: 'British Airways', logo: 'https://logos.skyscnr.com/images/airlines/favicon/BA.png' },
  { name: 'EasyJet', logo: 'https://logos.skyscnr.com/images/airlines/favicon/EZ.png' },
  { name: 'Ryanair', logo: 'https://logos.skyscnr.com/images/airlines/favicon/FR.png' },
  { name: 'Lufthansa', logo: 'https://logos.skyscnr.com/images/airlines/favicon/LH.png' },
  { name: 'Air France', logo: 'https://logos.skyscnr.com/images/airlines/favicon/AF.png' },
  { name: 'Emirates', logo: 'https://logos.skyscnr.com/images/airlines/favicon/EK.png' },
];

router.get('/airports', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  const filtered = AIRPORTS.filter(a =>
    a.name.toLowerCase().includes(q.toLowerCase()) ||
    a.subtitle.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filtered);
});

router.get('/flights', (req, res) => {
  const { from, to, date } = req.query;
  if (!from || !to || !date) return res.status(400).json({ message: 'from, to and date are required' });

  const flights = Array.from({ length: 6 }, (_, i) => {
    const airline = AIRLINES[i % AIRLINES.length];
    const basePrice = Math.floor(Math.random() * 200) + 50;
    const depHour = 6 + i * 2;
    const duration = Math.floor(Math.random() * 120) + 60;
    const arrHour = depHour + Math.floor(duration / 60);
    const stops = i % 3 === 0 ? 1 : 0;
    const depDate = new Date(date);
    depDate.setHours(depHour, 0, 0);
    const arrDate = new Date(depDate.getTime() + duration * 60000);

    return {
      id: `flight-${i}`,
      airline: airline.name,
      airlineLogo: airline.logo,
      price: basePrice + i * 15,
      duration: duration,
      stops: stops,
      departure: depDate.toISOString(),
      arrival: arrDate.toISOString(),
      origin: from,
      destination: to
    };
  });

  res.json(flights.sort((a, b) => parseInt(a.price.slice(1)) - parseInt(b.price.slice(1))));
});

module.exports = router;
