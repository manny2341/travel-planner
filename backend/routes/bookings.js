const express = require('express');
const router = express.Router();
const auth = require('../middleware/supabaseAuth');

// GET /api/bookings
router.get('/', auth, async (req, res) => {
  try {
    const { data, error } = await req.supabase
      .from('bookings')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/bookings
router.post('/', auth, async (req, res) => {
  try {
    const { type, title, amount, currency, payment_intent_id, details } = req.body;
    const { data, error } = await req.supabase
      .from('bookings')
      .insert({
        user_id: req.user.id,
        type: type || 'other',
        title: title || type,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        status: 'confirmed',
        payment_intent_id: payment_intent_id || null,
        details: details || {}
      })
      .select()
      .single();
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const { error } = await req.supabase
      .from('bookings')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);
    if (error) return res.status(500).json({ message: error.message });
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
