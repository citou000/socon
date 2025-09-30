import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

export const useAuth = defineStore('auth', () => {
  const user = ref(null);

  async function validateUserSession() {
    try {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session || !data.session.user) {
        clearUserData();
        return null;
      }

      return data.session.user;
    } catch (err) {
      clearUserData();
      console.log('Error', err);
      return null;
    }
  }

  function clearUserData() {
    const key = `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`;
    localStorage.removeItem(key);
    user.value = null;
    console.log('Stale session removed');
  }

  // Initialize user session
  validateUserSession().then((currentUser) => {
    user.value = currentUser;
  });

  // Listen to auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
    if (!session) clearUserData();
  });

  return { user, validateUserSession, clearUserData };
});
