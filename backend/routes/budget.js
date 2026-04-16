const express = require('express');
const router = express.Router();
const auth = require('../middleware/supabaseAuth');

// GET /api/budget
router.get('/', auth, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('budget_items')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: true });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data.map(item => ({ ...item, name: item.label })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/budget
router.post('/', auth, async (req, res) => {
  try {
    const { name, amount, category } = req.body;
    const { data, error } = await req.supabase
      .from('budget_items')
      .insert({
        user_id: req.user.id,
        label: name,
        amount: parseFloat(amount),
        category
      })
      .select()
      .single();
    if (error) return res.status(500).json({ message: error.message });
    res.json({ ...data, name: data.label });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/budget — clear all items for user
router.delete('/', auth, async (req, res) => {
  try {
    const { error } = await req.supabase
      .from('budget_items')
      .delete()
      .eq('user_id', req.user.id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: 'All items deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/budget/:id — delete single item
router.delete('/:id', auth, async (req, res) => {
  try {
    const { error } = await req.supabase
      .from('budget_items')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
