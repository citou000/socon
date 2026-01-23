<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from 'vue-toastification';

const loading = ref(false);
const message = ref('');
const errorMessage = ref('');
const cooldown = ref(false);
const time = ref(60);
const email = ref(localStorage.getItem('pendingEmailVerification') || '');
const toast = useToast();

const startCountdown = () => {
  startCooldown();
  const interval = setInterval(() => {
    time.value--;
    if (time.value <= 0) {
      clearInterval(interval);
      time.value = 60;
    }
  }, 1000);
};

const startCooldown = () => {
  cooldown.value = true;
  setInterval(() => {
    cooldown.value = false;
  }, 60000);
};

const resendEmail = async () => {
  loading.value = true;

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.value,
    });

    if (error) {
      throw error;
    }
    message.value =
      'Email de confirmation envoyé avec succès ! Veuillez vérifier votre boîte de réception.';
    toast.success(message.value);
    startCountdown();
  } catch (err) {
    errorMessage.value = err?.message || 'Failed to resend email. Please try again later.';
    startCountdown();
  } finally {
    loading.value = false;
  }
};
startCountdown();
</script>

<template>
  <div class="flex items-center justify-center bg-purple-100 h-screen w-full">
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow text-center">
      <h1 class="text-2xl font-bold mb-3">Confirme ton e-mail</h1>

      <p class="mb-5">
        Un e-mail de confirmation t’a été envoyé.<br />
        Ouvre-le et clique sur le lien pour activer ton compte.
      </p>

      <div class="flex flex-col gap-4">
        <BaseButton variant="primary" @click="resendEmail" v-if="!cooldown">
          {{ loading ? 'Envoi…' : 'Renvoyer l’e-mail' }}
        </BaseButton>

        <BaseButton variant="secondary" v-else> Réessayer dans {{ time }} s </BaseButton>
      </div>

      <p v-if="message" class="mt-4 text-green-700 font-medium">E-mail envoyé avec succès.</p>

      <p v-else-if="errorMessage" class="mt-4 text-red-700 font-medium">Une erreur est survenue.</p>
    </div>
  </div>
</template>
