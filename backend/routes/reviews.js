const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');
const auth = require('../middleware/supabaseAuth');

// GET /api/reviews — public, all reviews
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reviews/:placeId — public, uses service role client
router.get('/:placeId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('place_id', req.params.placeId)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ message: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/reviews
router.post('/', auth, async (req, res) => {
  try {
    const { placeId, placeName, rating, comment, userName } = req.body;
    const { data, error } = await req.supabase
      .from('reviews')
      .insert({
        user_id: req.user.id,
        user_name: userName,
        place_id: placeId,
        place_name: placeName,
        rating,
        comment
      })
      .select()
      .single();
    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ message: 'You already reviewed this place' });
      }
      return res.status(500).json({ message: error.message });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/reviews/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const { error } = await req.supabase
      .from('reviews')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);
    if (error) return res.status(404).json({ message: error.message });
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
