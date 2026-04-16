import { useState } from 'react';

export function BookingFilterForm({ type, onFilter }) {
  const maxPrice = type === 'flights' ? 2000 : 1000;
  const [maxVal, setMaxVal] = useState(maxPrice);
  const [sortBy, setSortBy] = useState('price');

  const handleApply = () => {
    onFilter({ minPrice: 0, maxPrice: maxVal, sortBy });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-semibold text-gray-900 mb-4">Filter {type === 'flights' ? 'Flights' : 'Hotels'}</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-500">Max price</label>
            <span className="text-sm font-medium text-blue-600">£0 — £{maxVal}</span>
          </div>
          <input type="range" min="0" max={maxPrice} value={maxVal}
            onChange={e => setMaxVal(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
        </div>
        <div className="flex gap-4 items-end">
          <div>
            <label className="text-sm text-gray-500 block mb-1">Sort by</label>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="price">Price</option>
              <option value="duration">Duration</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export function BudgetCalculatorForm({ onAddItem }) {
  const [form, setForm] = useState({ name: '', amount: '', category: 'flights', currency: 'GBP' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ ...form, amount: parseFloat(form.amount), id: Date.now().toString() });
    setForm({ name: '', amount: '', category: 'flights', currency: 'GBP' });
  };

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3";

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-4">
      <input style={{}} className={inputStyle} type="text" placeholder="Expense name (e.g. Return flights)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
      <input className={inputStyle} type="number" placeholder="Amount (£)" step="0.01" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} required />
      <select className={inputStyle} value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
        <option value="flights">Flights</option>
        <option value="accommodation">Accommodation</option>
        <option value="food">Food & Dining</option>
        <option value="activities">Activities</option>
        <option value="transportation">Transportation</option>
        <option value="other">Other</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
        Add Expense
      </button>
    </form>
  );
}

export function SearchForm({ onSearch }) {
  const [form, setForm] = useState({ location: '', minBudget: '', maxBudget: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      location: form.location,
      minBudget: form.minBudget ? Number(form.minBudget) : undefined,
      maxBudget: form.maxBudget ? Number(form.maxBudget) : undefined
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 flex flex-wrap gap-4 items-end max-w-4xl mx-auto">
      <div className="flex-1 min-w-48">
        <label className="text-sm text-gray-500 block mb-1">Search destination</label>
        <input type="text" placeholder="e.g. Paris, Japan, Beach..." value={form.location}
          onChange={e => setForm({...form, location: e.target.value})}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      </div>
      <div className="min-w-32">
        <label className="text-sm text-gray-500 block mb-1">Min budget (£)</label>
        <input type="number" placeholder="0" value={form.minBudget}
          onChange={e => setForm({...form, minBudget: e.target.value})}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      </div>
      <div className="min-w-32">
        <label className="text-sm text-gray-500 block mb-1">Max budget (£)</label>
        <input type="number" placeholder="5000" value={form.maxBudget}
          onChange={e => setForm({...form, maxBudget: e.target.value})}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}

export function PlanCreatorForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    title: initialData?.title || initialData?.name || '',
    destination: initialData?.destination || '',
    startDate: initialData?.startDate ? initialData.startDate.split('T')[0] : '',
    endDate: initialData?.endDate ? initialData.endDate.split('T')[0] : '',
    budget: initialData?.budget || '',
    notes: initialData?.notes || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, name: form.title, destinations: [form.destination] });
  };

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4";
  const labelStyle = "text-sm text-gray-500 block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className={labelStyle}>Plan title</label>
        <input className={inputStyle} type="text" placeholder="e.g. Paris Summer Adventure" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
      </div>
      <div>
        <label className={labelStyle}>Destination</label>
        <input className={inputStyle} type="text" placeholder="e.g. Paris, France" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Start date</label>
          <input className={inputStyle} type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
        </div>
        <div>
          <label className={labelStyle}>End date</label>
          <input className={inputStyle} type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
        </div>
      </div>
      <div>
        <label className={labelStyle}>Total budget (£)</label>
        <input className={inputStyle} type="number" placeholder="e.g. 1500" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
      </div>
      <div>
        <label className={labelStyle}>Notes (optional)</label>
        <textarea className={inputStyle} rows={3} placeholder="Any special notes about your trip..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        Save Plan
      </button>
    </form>
  );
}

export function ReviewForm({ onSubmit }) {
  const [form, setForm] = useState({ rating: 5, title: '', comment: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ rating: 5, title: '', comment: '' });
  };

  const inputStyle = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-3";

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mt-4">
      <div>
        <label className="text-sm text-gray-500 block mb-2">Your rating</label>
        <div className="flex gap-1 mb-3">
          {[1,2,3,4,5].map(star => (
            <button key={star} type="button" onClick={() => setForm({...form, rating: star})}
              className={`text-3xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-200'}`}>
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm text-gray-500 block mb-1">Destination</label>
        <input className={inputStyle} type="text" placeholder="e.g. Eiffel Tower, Santorini, Tokyo" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
      </div>
      <div>
        <label className="text-sm text-gray-500 block mb-1">Your review</label>
        <textarea className={inputStyle} rows={5} placeholder="Share the details of your experience..." value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} required />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
}
