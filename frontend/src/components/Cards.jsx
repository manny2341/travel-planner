import { Plane, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function FlightCard({ flight }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {flight.airlineLogo && <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 object-contain" />}
          <div>
            <p className="font-semibold text-gray-900">{flight.airline}</p>
            <p className="text-sm text-gray-500 capitalize">{flight.class}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
          <p className="text-sm text-gray-500">per person</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.departure.time}</p>
          <p className="text-sm text-gray-500">{flight.departure.city}</p>
          <p className="text-xs text-gray-400">{flight.departure.airport}</p>
        </div>
        <div className="flex-1 mx-4 text-center">
          <div className="flex items-center gap-2 justify-center text-gray-400 text-sm mb-1">
            <Clock className="w-3 h-3" />{flight.duration}
          </div>
          <div className="border-t border-gray-300 relative">
            <Plane className="w-4 h-4 text-blue-500 absolute -top-2 left-1/2 -translate-x-1/2 bg-white" />
          </div>
          <p className="text-xs text-gray-400 mt-1">{flight.stops === 0 ? 'Direct' : `${flight.stops} stop`}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.arrival.time}</p>
          <p className="text-sm text-gray-500">{flight.arrival.city}</p>
          <p className="text-xs text-gray-400">{flight.arrival.airport}</p>
        </div>
      </div>
    </div>
  );
}

export function HotelCard({ hotel }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{hotel.name}</h3>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">${hotel.price}</p>
            <p className="text-xs text-gray-500">/{hotel.priceUnit}</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">{hotel.location}, {hotel.city}</p>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">★</span>
          <span className="font-medium">{hotel.rating}</span>
          <span className="text-gray-400 text-sm">({hotel.reviewCount} reviews)</span>
        </div>
        <p className="text-sm text-gray-600">{hotel.description}</p>
      </div>
    </div>
  );
}

export function BudgetCategoryCard({ category, amount, percentage }) {
  const labels = {
    flights: "Flights", accommodation: "Accommodation",
    food: "Food & Dining", activities: "Activities",
    transportation: "Transportation", other: "Other Expenses"
  };
  const colors = {
    flights: "#0077b6", accommodation: "#00b4d8",
    food: "#f77f00", activities: "#28a745",
    transportation: "#6f42c1", other: "#888"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{labels[category] || category}</span>
        <div className="text-right">
          <span className="text-sm font-semibold">${amount.toFixed(2)}</span>
          <span className="text-xs text-gray-400 ml-2">{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: colors[category] || '#888' }} />
      </div>
    </div>
  );
}

export function DestinationCard({ destination }) {
  return (
    <Link to={`/destinations/${destination.id}`} style={{ textDecoration: 'none' }}>
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
      <div className="relative">
        <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
        <div className="absolute top-3 right-3">
          <span className="bg-white text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow">
            {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{destination.name}</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span>📍</span> {destination.location}, {destination.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">${destination.price}</p>
            <p className="text-xs text-gray-400">per person</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400">★</span>
          <span className="font-medium text-sm">{destination.rating}</span>
          <span className="text-gray-400 text-xs">({destination.reviewCount.toLocaleString()} reviews)</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
        <div className="flex flex-wrap gap-1">
          {destination.tags.map(tag => (
            <span key={tag} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </div>
    </Link>
  );
}

export function PlanCard({ plan }) {
  const days = plan.startDate && plan.endDate
    ? Math.ceil((new Date(plan.endDate) - new Date(plan.startDate)) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{plan.title || plan.name}</h3>
          <p className="text-blue-600 text-sm flex items-center gap-1 mt-1">
            <span>📍</span> {plan.destination || (plan.destinations && plan.destinations.join(', '))}
          </p>
        </div>
        {plan.budget > 0 && (
          <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
            ${plan.budget}
          </span>
        )}
      </div>
      {(plan.startDate || plan.endDate) && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📅</span>
          <span>{plan.startDate && new Date(plan.startDate).toLocaleDateString()}</span>
          {plan.endDate && <><span>—</span><span>{new Date(plan.endDate).toLocaleDateString()}</span></>}
          {days && <span className="text-gray-400">({days} days)</span>}
        </div>
      )}
      <div className="flex gap-4 text-sm text-gray-400">
        <span>📌 {plan.destinations?.length || 0} places</span>
        {plan.spent > 0 && <span>💰 ${plan.spent} spent</span>}
      </div>
    </div>
  );
}

export function ReviewCard({ review }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div style={{width:"40px",height:"40px",borderRadius:"50%",background:"#e8f4fd",display:"flex",alignItems:"center",justifyContent:"center",color:"#0077b6",fontWeight:"600",fontSize:"1rem",overflow:"hidden"}}>
            {review.userAvatar ? <img src={review.userAvatar} alt={review.userName} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={(e)=>{e.target.style.display="none"}} /> : review.userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-900">{review.userName}</p>
              {review.verified && (
                <span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Verified</span>
              )}
            </div>
            <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[1,2,3,4,5].map(star => (
            <span key={star} className={`text-lg ${star <= review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
        <p className="text-gray-600 leading-relaxed text-sm">{review.comment}</p>
      </div>
    </div>
  );
}
