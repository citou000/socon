<script setup>
import { ref, warn } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import logo from '@/components/icons/logo.svg';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const store = useMemberStore();
const { logging } = storeToRefs(store);
logging.value = true;

const email = ref(null);
const password = ref(null);

const handleConnect = async () => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (!error) {
    warn('Signed in succesfully!');
    console.log(data);
    router.push('/');
    return;
  }
  warn('Error not signed in');
  throw error;
};
</script>

<template>
  <div class="flex flex-col items-center bg-purple-100 w-full h-screen justify-center gap-7">
    <div class="bg-white rounded-xl flex flex-col gap-4 md:w-[35%] w-[90%] px-2 mx-4 py-4">
      <div class="flex flex-col items-center">
        <img :src="logo" alt="Logo" class="size-12 object-contain" />
        <h1 class="text-balance text-gray-400">Bon retour sur Soul Connect</h1>
      </div>
      <form
        action=""
        class="flex flex-col gap-3 p-5 rounded-2xl items-center w-full"
        @submit.prevent="handleConnect"
      >
        <div class="flex flex-col gap-1 w-full">
          <label for="email">Name</label>
          <input
            required
            type="email"
            name="email"
            id="email"
            v-model="email"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex justify-center mt-4 w-full">
          <BaseButton variant="primary"><span>Se connecter</span></BaseButton>
        </div>
      </form>
      <div class="text-sm items-center text-center mx-auto">
        Vous n'avez pas de compte ?
        <RouterLink to="/signup" class="text-purple-600 font-bold">Incrivez-vous</RouterLink>
      </div>
    </div>
  </div>
</template>
