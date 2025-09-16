import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';

const user = ref(null);

// supabase.auth.getSession().then(({ data }) => {
//   user.value = data.session?.user ?? null;
// });

user.value = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

supabase.auth.onAuthStateChange((_, session) => {
  user.value = user.value ? session?.user : null;
});

export function useAuth() {
  return { user };
}
