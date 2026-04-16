import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(supabaseUser, accessToken) {
    if (!supabaseUser) {
      setUser(null);
      setToken(null);
      return;
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', supabaseUser.id)
      .single();
    setUser({
      id: supabaseUser.id,
      email: supabaseUser.email,
      name: profile?.name || supabaseUser.user_metadata?.name || ''
    });
    setToken(accessToken);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadProfile(session?.user ?? null, session?.access_token ?? null).finally(() => setLoading(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadProfile(session?.user ?? null, session?.access_token ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  // Allow pages to manually refresh the stored user (e.g. after profile update)
  const refreshUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    await loadProfile(session?.user ?? null, session?.access_token ?? null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
