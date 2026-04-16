const express = require('express');
const router = express.Router();
const auth = require('../middleware/supabaseAuth');

async function fetchFullPlan(supabase, planId, userId) {
  const { data: plan, error } = await supabase
    .from('plans')
    .select('*')
    .eq('id', planId)
    .eq('user_id', userId)
    .single();
  if (error || !plan) return null;

  const [{ data: destinations }, { data: expenses }] = await Promise.all([
    supabase.from('plan_destinations').select('*').eq('plan_id', planId),
    supabase.from('plan_expenses').select('*').eq('plan_id', planId)
  ]);

  return {
    ...plan,
    startDate: plan.start_date,
    endDate: plan.end_date,
    destinations: destinations || [],
    expenses: expenses || []
  };
}

async function recalcSpent(supabase, planId) {
  const { data: expenses } = await supabase
    .from('plan_expenses')
    .select('amount')
    .eq('plan_id', planId);
  const spent = (expenses || []).reduce((sum, e) => sum + Number(e.amount), 0);
  await supabase.from('plans').update({ spent }).eq('id', planId);
  return spent;
}

// GET /api/plans
router.get('/', auth, async (req, res) => {
  try {
    const { data: plans, error } = await req.supabase
      .from('plans')
      .select('*, plan_destinations(*), plan_expenses(*)')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    const shaped = plans.map(p => ({
      ...p,
      startDate: p.start_date,
      endDate: p.end_date,
      destinations: p.plan_destinations || [],
      expenses: p.plan_expenses || []
    }));
    res.json(shaped);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/plans/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/plans
router.post('/', auth, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, budget } = req.body;
    const { data: plan, error } = await req.supabase
      .from('plans')
      .insert({
        user_id: req.user.id,
        title,
        destination,
        start_date: startDate || null,
        end_date: endDate || null,
        budget: parseFloat(budget) || 0,
        spent: 0
      })
      .select()
      .single();
    if (error) return res.status(500).json({ message: error.message });
    res.json({ ...plan, startDate: plan.start_date, endDate: plan.end_date, destinations: [], expenses: [] });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT /api/plans/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, budget } = req.body;
    const { error } = await req.supabase
      .from('plans')
      .update({
        title,
        destination,
        start_date: startDate || null,
        end_date: endDate || null,
        budget: parseFloat(budget) || 0
      })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);
    if (error) return res.status(500).json({ message: error.message });
    const plan = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/plans/:id/destinations
router.post('/:id/destinations', auth, async (req, res) => {
  try {
    const { placeId, name, address, rating, photo, notes } = req.body;
    const { error } = await req.supabase.from('plan_destinations').insert({
      plan_id: req.params.id,
      place_id: placeId,
      name,
      address,
      rating,
      photo,
      notes
    });
    if (error) return res.status(500).json({ message: error.message });
    const full = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!full) return res.status(404).json({ message: 'Plan not found' });
    res.json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/plans/:id/expenses
router.post('/:id/expenses', auth, async (req, res) => {
  try {
    const { description, amount, category, date } = req.body;
    const { error } = await req.supabase.from('plan_expenses').insert({
      plan_id: req.params.id,
      description,
      amount: parseFloat(amount),
      category,
      date: date || null
    });
    if (error) return res.status(500).json({ message: error.message });
    await recalcSpent(req.supabase, req.params.id);
    const full = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!full) return res.status(404).json({ message: 'Plan not found' });
    res.json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/plans/:id/expenses/:expenseId
router.delete('/:id/expenses/:expenseId', auth, async (req, res) => {
  try {
    await req.supabase.from('plan_expenses').delete().eq('id', req.params.expenseId);
    await recalcSpent(req.supabase, req.params.id);
    const full = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!full) return res.status(404).json({ message: 'Plan not found' });
    res.json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/plans/:id/destinations/:destId
router.delete('/:id/destinations/:destId', auth, async (req, res) => {
  try {
    await req.supabase.from('plan_destinations').delete().eq('id', req.params.destId);
    const full = await fetchFullPlan(req.supabase, req.params.id, req.user.id);
    if (!full) return res.status(404).json({ message: 'Plan not found' });
    res.json(full);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/plans/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await req.supabase.from('plans').delete().eq('id', req.params.id).eq('user_id', req.user.id);
    res.json({ message: 'Plan deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
