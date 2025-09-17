<template>
  <div class="flex items-center justify-center bg-purple-100 h-screen w-full">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
      <h1 class="text-2xl font-bold mb-4">Confirm Your Email</h1>
      <p class="mb-6">
        Thank you for signing up!<br />
        We've sent a confirmation email to your inbox.<br />
        Please check your email and click the confirmation link to activate your account.
      </p>
      <p class="flex flex-col gap-4">
        <BaseButton variant="primary" @click="resendEmail"> Resend Confirmation Email </BaseButton>
        <BaseButton variant="tertiary">Didn't receive the email?</BaseButton>
      </p>
      <p v-if="message" class="mt-4 text-green-700 font-medium">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { supabase } from '@/lib/supabaseClient';
import BaseButton from '@/components/BaseButton.vue';

const loading = ref(false);
const message = ref('');

const resendEmail = async () => {
  loading.value = true;
  message.value = '';
  try {
    // const user = await supabase.auth.
  } catch (err) {
    message.value = 'Failed to resend email. Please try again later.';
    loading.value = false;
  }
};
</script>
