<script setup>
import BaseButton from '@/components/BaseButton.vue';
import logo from '@/assets/logo.svg';
import { supabase } from '@/lib/supabaseClient';
import { ref } from 'vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useToast } from 'vue-toastification';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const store = useMemberStore();
const { logging } = storeToRefs(store);
const toast = useToast();
logging.value = true;
const loading = ref(false);

const email = ref('');
const password = ref('');
const confirmedPassword = ref('');
const name = ref('');
const role = ref('mentor');

const handleConnect = async () => {
  if (!email.value || !password.value || !confirmedPassword.value || !name.value) {
    toast.error('All fields are required');
    return;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email.value)) {
    toast.error('Invalid email address');
    return;
  }

  if (password.value !== confirmedPassword.value) {
    toast.error('Passwords do not match');
    return;
  }

  if (password.value.length < 8) {
    toast.error('Password must be at least 8 characters long');
    return;
  }

  try {
    loading.value = true;
    const { error: signupError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          name: name.value,
          role: role.value,
        },
        emailRedirectTo: window.location.origin + '/confirmation',
      },
    });
    if (signupError) {
      toast.error(signupError.message);
      loading.value = false;
      return;
    }
    loading.value = false;
    toast.success('Signup successful! Please check your email to confirm your account.');
    router.push('/confirmation');
  } catch (err) {
    toast.error('Something went wrong. Please try again later.', err);
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center bg-purple-100 w-full h-screen justify-center gap-7">
    <div
      class="bg-white py-8 flex flex-col gap-4 px-2 md:w-md md:h-auto size-full md:text-base md:rounded-2xl text-sm relative justify-center"
    >
      <div class="flex flex-col items-center">
        <img :src="logo" alt="Logo" class="size-8 object-contain" />
        <h1 class="text-balance text-gray-400">Bienvenue sur Soul Connect</h1>
      </div>
      <form
        class="flex flex-col gap-3 p-5 rounded-2xl items-center w-full"
        @submit.prevent="handleConnect"
      >
        <div class="flex flex-col gap-1 w-full">
          <label for="name">Name</label>
          <input
            required
            type="text"
            id="name"
            v-model="name"
            class="border-2 border-purple-100 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="email">E-mail</label>
          <input
            required
            type="email"
            id="email"
            v-model="email"
            class="border-2 border-purple-100 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex flex-col gap-1 w-full">
          <label for="password">Password</label>
          <input
            required
            type="password"
            id="password"
            v-model="password"
            class="border-2 border-purple-100 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label for="confirmedPassword">Confirmer le mot de passe</label>
          <input
            required
            type="password"
            id="confirmedPassword"
            v-model="confirmedPassword"
            class="border-2 border-purple-100 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>

        <div class="flex flex-col gap-1 w-full">
          <label for="role">Rôle</label>
          <select
            id="role"
            v-model="role"
            class="border-2 border-purple-100 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          >
            <option value="admin">Admin</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <div class="flex justify-center mt-4 w-full">
          <BaseButton
            variant="primary"
            :disabled="loading || !email || !password || !confirmedPassword || !name"
            type="submit"
          >
            <LoadingSpinner v-if="loading" size="sm" />
            <span v-else>S'inscrire</span>
          </BaseButton>
        </div>
      </form>
      <div class="text-sm items-center text-center mx-auto absolute bottom-4 left-0 right-0">
        Vous avez déjà un compte ?
        <RouterLink to="/login" class="text-purple-600 font-bold">Connectez-vous</RouterLink>
      </div>
    </div>
  </div>
</template>
