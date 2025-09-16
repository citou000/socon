<script setup>
import BaseButton from '@/components/BaseButton.vue';
import logo from '@/components/icons/logo.svg';
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const store = useMemberStore();
const { logging } = storeToRefs(store);
logging.value = true;

const email = ref(null);
const password = ref(null);
const confirmedPassword = ref(null);
const name = ref(null);

const handleConnect = async () => {
  if (password.value !== confirmedPassword.value) {
    console.log('Passwords do not match');
    alert('Passwords do not match');
    return;
  } else {
    const { error: signupError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (signupError) {
      throw signupError;
    } else {
      alert('Done');
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center bg-purple-100 w-full h-screen justify-center gap-7">
    <div class="bg-white py-8 rounded-2xl flex flex-col gap-4 px-2 lg:w-[35%]">
      <div class="flex flex-col items-center">
        <img :src="logo" alt="Logo" class="size-12 object-contain" />
        <h1 class="text-balance text-gray-400">Bienvenue sur Soul Connect</h1>
      </div>
      <form
        action=""
        class="flex flex-col gap-3 p-5 rounded-2xl items-center w-full"
        @submit.prevent="handleConnect"
      >
        <div class="flex flex-col gap-1 w-full">
          <label for="name">Name</label>
          <input
            required
            type="text"
            name="Name"
            id="name"
            v-model="name"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="email">E-mail</label>
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
            required
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label for="confirmedPassword">Confirmer le mot de passe</label>
          <input
            required
            type="password"
            name="confirmedPassword"
            id="confirmedPassword"
            v-model="confirmedPassword"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex justify-center mt-4 w-full">
          <BaseButton variant="primary"><span>Se connecter</span></BaseButton>
        </div>
      </form>
      <div class="text-sm items-center text-center mx-auto">
        Vous avez dejà un compte ?
        <RouterLink to="/signup" class="text-purple-600 font-bold">Connectez-vous</RouterLink>
      </div>
    </div>
  </div>
</template>
