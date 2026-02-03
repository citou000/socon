import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

const initialized = ref(false);

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
  async function init() {
    if (initialized.value) return;
    user.value = await validateUserSession();
    initialized.value = true;
  }

  function clearUserData() {
    const key = `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`;
    localStorage.removeItem(key);
    user.value = null;
    console.log('Stale session removed');
  }

  // Listen to auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
    if (!session) clearUserData();
  });
  return { user, init, initialized };
});
