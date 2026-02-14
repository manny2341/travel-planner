const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  placeId: String,
  name: String,
  address: String,
  rating: Number,
  photo: String,
  notes: String
});

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: 'Other' },
  date: { type: Date, default: Date.now }
});

const planSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  budget: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
  destinations: [destinationSchema],
  expenses: [expenseSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);
