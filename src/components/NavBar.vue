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
const inviteSharing = ref(false);
const linkGenerated = ref(false);
const inviteLink = ref('');

const props = defineProps({
  team: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(['loading', 'addSouls']);

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

const openCopyInvite = () => {
  profileMenu.value = false;
  inviteSharing.value = true;
};

const manageModal = () => {
  if (profileMenu.value || inviteSharing.value) {
    profileMenu.value = false;
    inviteSharing.value = false;
  } else {
    profileMenu.value = true;
  }
};

const linkGeneration = () => {
  const inviteCode =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const inviteLink = `${window.location.origin}/invite/${inviteCode}`;
  const { data, error } = supabase
    .from('invites')
    .insert([{ code: inviteCode, created_at: new Date() }]);
  if (error) {
    toast.error("Erreur lors de la génération du lien d'invitation");
    return '';
  }
  return inviteLink;
};
</script>
<template>
  <nav :class="[
    'px-4 py-3 flex justify-between items-center',
    props.team ? 'bg-white border-b border-purple-100' : 'bg-purple-200',
  ]">
    <RouterLink to="/">
      <div class="size-10">
        <img :src="logo" alt="logo" />
      </div>
    </RouterLink>
    <div v-if="!props.team" class="flex items-center justify-between gap-5">
      <BaseButton variant="primary" @click="emit('addSouls')" class="hidden md:flex">
        <Plus />
        <span>Ajouter une âme</span>
      </BaseButton>
      <div class="cursor-pointer rounded-full w-10" @click="manageModal">
        <img src="https://api.dicebear.com/9.x/lorelei/jpg" alt="Avatar" class="w-full h-full rounded-full" />
      </div>
    </div>
    <div class="absolute bg-white right-3 top-18 p-2 rounded-xl z-100" v-if="profileMenu">
      <ul class="flex flex-col gap-2 w-fit">
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="openCopyInvite">
          Inviter des membres
        </li>
        <hr class="border text-gray-300" />
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="loggingOut">
          Se déconnecter
        </li>
      </ul>
    </div>
    <div class="absolute bg-white right-3 top-18 p-2 rounded-xl z-100 flex flex-col gap-4 w-sm" v-show="inviteSharing">
      <div v-if="!linkGenerated" class="flex flex-col gap-4">
        <span class="font-semibold text-lg">Générer un lien d'invitation</span>
        <BaseButton variant="primary" @click="
          inviteLink = linkGeneration();
        linkGenerated = true;
        ">
          Générer
        </BaseButton>
      </div>
      <div v-if="linkGenerated" class="flex flex-col gap-4">
        <span class="font-semibold text-lg">Partager le lien d'invitation</span>
        <input type="text" readonly class="border border-gray-300 rounded-md p-2 w-full cursor-default"
          v-model="inviteLink" />
        <BaseButton variant="primary" @click="alert('Copy link')"> Copier le lien </BaseButton>
      </div>
    </div>
  </nav>
</template>
