const express = require('express');
const router = express.Router();
const supabase = require('../lib/supabase');
const supabaseAuth = require('../middleware/supabaseAuth');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true
    });
    if (error) {
      if (error.message.includes('already registered') || error.code === 'email_exists') {
        return res.status(400).json({ message: 'User already exists' });
      }
      return res.status(400).json({ message: error.message });
    }
    // Sign in immediately to get a session token
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) return res.status(500).json({ message: 'Registration succeeded but sign-in failed' });

    const profile = await getProfile(data.user.id);
    res.json({
      token: signInData.session.access_token,
      user: { id: data.user.id, name: profile?.name || name, email: data.user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return res.status(400).json({ message: 'Invalid credentials' });
    const profile = await getProfile(data.user.id);
    res.json({
      token: data.session.access_token,
      user: { id: data.user.id, name: profile?.name || data.user.user_metadata?.name || '', email: data.user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/auth/profile
router.put('/profile', supabaseAuth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updates = {};
    if (name) updates.name = name;

    const { error: profileError } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id);

    if (profileError) return res.status(500).json({ message: 'Failed to update profile' });

    if (email && email !== req.user.email) {
      const { error: emailError } = await supabase.auth.admin.updateUserById(req.user.id, { email });
      if (emailError) return res.status(500).json({ message: 'Failed to update email' });
    }

    const profile = await getProfile(req.user.id);
    res.json({ user: { id: req.user.id, name: profile?.name, email: email || req.user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', supabaseAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    const { error } = await supabase.auth.admin.updateUserById(req.user.id, { password: newPassword });
    if (error) return res.status(500).json({ message: 'Failed to change password' });
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.ALLOWED_ORIGINS?.split(',')[0]?.trim() + '/reset-password'
    });
    // Always succeed to avoid email enumeration
    res.json({ message: 'If an account exists, a reset link has been sent.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

async function getProfile(userId) {
  const { data } = await supabase.from('profiles').select('name').eq('id', userId).single();
  return data;
}

module.exports = router;
