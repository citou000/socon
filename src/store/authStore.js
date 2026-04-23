import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useAuth = defineStore('auth', () => {
  const user = ref(null)
  const session = ref(null)
  const initialized = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  async function init() {
    console.log("Init called");
    if (initialized.value) return

    const { data } = await supabase.auth.getSession()
    console.log(data);

    if (data) {
      session.value = data.session ?? null;
      user.value = data.session?.user ?? null;
    }
    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
      user.value = newSession?.user ?? null
    })

    initialized.value = true
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  return {
    user,
    session,
    initialized,
    isAuthenticated,
    init,
    signOut
  }
})
