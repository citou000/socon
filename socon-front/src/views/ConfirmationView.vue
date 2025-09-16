<template>
  <div class="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow text-center">
    <h1 class="text-2xl font-bold mb-4">Confirm Your Email</h1>
    <p class="mb-6">
      Thank you for signing up!<br />
      We've sent a confirmation email to your inbox.<br />
      Please check your email and click the confirmation link to activate your account.
    </p>
    <p class="mb-4">
      Didn't receive the email?
      <button
        @click="resendEmail"
        :disabled="loading"
        class="ml-2 px-4 py-1.5 rounded bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Resend Confirmation Email
      </button>
    </p>
    <p v-if="message" class="mt-4 text-green-700 font-medium">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);
const message = ref('');

const resendEmail = async () => {
  loading.value = true;
  message.value = '';
  try {
    // Replace with your API call
    // await api.resendConfirmationEmail()
    setTimeout(() => {
      message.value = 'A new confirmation email has been sent.';
      loading.value = false;
    }, 1000);
  } catch {
    message.value = 'Failed to resend email. Please try again later.';
    loading.value = false;
  }
};
</script>
