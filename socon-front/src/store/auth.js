// lib/auth.ts
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';

// Reactive user object
const user = ref(null);

/**
 * Validate current Supabase session.
 * If invalid, clears localStorage and returns null.
 */
export async function validateUserSession() {
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

/**
 * Clears the Supabase auth token from localStorage
 */
function clearUserData() {
  const key = `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`;
  localStorage.removeItem(key);
  user.value = null;
  console.log('Stale session removed');
}

/**
 * Vue hook to provide reactive user object
 */
export function useAuth() {
  // Initialize user session
  validateUserSession().then((currentUser) => {
    user.value = currentUser;
  });

  // Listen to auth state changes
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
    if (!session) clearUserData();
  });

  return { user };
}
