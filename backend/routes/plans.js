const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Plan = require('../models/Plan');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/', auth, async (req, res) => {
  try {
    const plans = await Plan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(plans);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const plan = new Plan({ ...req.body, user: req.user.id });
    await plan.save();
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { ...req.body },
      { new: true }
    );
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/:id/destinations', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    plan.destinations.push(req.body);
    await plan.save();
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.post('/:id/expenses', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    plan.expenses.push(req.body);
    plan.spent = plan.expenses.reduce((sum, e) => sum + e.amount, 0);
    await plan.save();
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id/expenses/:expenseId', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    plan.expenses = plan.expenses.filter(e => e._id.toString() !== req.params.expenseId);
    plan.spent = plan.expenses.reduce((sum, e) => sum + e.amount, 0);
    await plan.save();
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id/destinations/:placeId', auth, async (req, res) => {
  try {
    const plan = await Plan.findOne({ _id: req.params.id, user: req.user.id });
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    plan.destinations = plan.destinations.filter(d => d._id.toString() !== req.params.placeId);
    await plan.save();
    res.json(plan);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Plan.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Plan deleted' });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
