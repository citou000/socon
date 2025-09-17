<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import logo from '@/components/icons/logo.svg';
import { supabase } from '@/lib/supabaseClient';
import router from '@/router';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const store = useMemberStore();
const { logging } = storeToRefs(store);
logging.value = true;

const toast = useToast();
const email = ref('');
const password = ref('');
const loading = ref(false);

const handleConnect = async () => {
  if (!email.value || !password.value) {
    toast.error('All fields are required');
    return;
  }

  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success('Signed in successfully!');
    router.push('/');
  } catch {
    toast.error('Something went wrong. Please try again later.');
  } finally {
    loading.value = false;
  }
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
        class="flex flex-col gap-3 p-5 rounded-2xl items-center w-full"
        @submit.prevent="handleConnect"
      >
        <div class="flex flex-col gap-1 w-full">
          <label for="email">E-mail</label>
          <input
            required
            type="email"
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
            id="password"
            v-model="password"
            class="border-2 border-purple-200 focus:border-purple-400 outline-0 focus:border-2 rounded-md py-2 px-1 transition-all ease-in"
          />
        </div>
        <div class="flex justify-center mt-4 w-full">
          <BaseButton variant="primary" :disabled="loading">
            <LoadingSpinner v-if="loading" size="sm" color="white" />
            <span v-else>Se connecter</span>
          </BaseButton>
        </div>
      </form>
      <div class="text-sm items-center text-center mx-auto">
        Vous n'avez pas de compte ?
        <RouterLink to="/signup" class="text-purple-600 font-bold">Inscrivez-vous</RouterLink>
      </div>
    </div>
  </div>
</template>