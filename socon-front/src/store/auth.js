import { supabase } from '@/lib/supabaseClient';
import { ref, onMounted } from 'vue';

const user = ref(null);

export function useAuth() {
  onMounted(async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session && data.session.user) {
      user.value = data.session.user;
    } else {
      // session invalid or expired
      const key = `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`;
      localStorage.removeItem(key);
      user.value = null;
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });
  });

  return { user };
}
