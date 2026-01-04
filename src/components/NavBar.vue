<script setup>
import logo from '@/assets/logo.svg';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { supabase } from '@/lib/supabaseClient';
import BaseButton from '@/components/BaseButton.vue';
import { Plus } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const toast = useToast();
const profileMenu = ref(false);
const router = useRouter();

const emit = defineEmits(['loading','addSouls']);

const loggingOut = async () => {
  profileMenu.value = false;
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error('Erreur de déconnexion');
    return;
  }
  toast.success('Déconnecter avec succès');
  router.push('/login');
};
</script>
<template>
  <nav class="px-4 py-3 flex justify-between items-center bg-purple-200">
    <RouterLink to="/"
      ><div class="size-10">
        <img :src="logo" alt="logo" /></div
    ></RouterLink>
    <div class="flex items-center justify-between gap-5">
      <BaseButton variant="primary" @click="emit('addSouls')">
        <Plus />
        <span>Ajouter une âme</span>
      </BaseButton>
      <div class="cursor-pointer rounded-full w-18" @click="profileMenu = !profileMenu">
        <img
          src="https://api.dicebear.com/9.x/lorelei/jpg"
          alt="Avatar"
          class="w-full h-full rounded-full"
        />
      </div>
    </div>
    <div class="absolute bg-white right-3 top-18 p-2 rounded-xl z-100" v-if="profileMenu">
      <ul class="flex flex-col gap-2 w-fit">
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
        >
          Paramètre de l'organisation
        </li>
        <hr class="border-1 text-gray-300" />
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="loggingOut"
        >
          Se déconnecter
        </li>
      </ul>
    </div>
  </nav>
</template>
