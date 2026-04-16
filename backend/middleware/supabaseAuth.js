const { createClient } = require('@supabase/supabase-js');

module.exports = async function supabaseAuth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });

  // Create a user-scoped client using the user's JWT
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return res.status(401).json({ message: 'Invalid token' });

  req.user = user;
  req.supabase = supabase; // attach user-scoped client for data operations
  next();
};
