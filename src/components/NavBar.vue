<script setup>
import logo from "@/assets/logo.svg";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { supabase } from "@/lib/supabaseClient";
import BaseButton from "@/components/BaseButton.vue";
import { Plus } from "@lucide/vue";
import { useRouter, useRoute } from "vue-router";
import { Copy, CheckCheck } from "@lucide/vue";
import { useMemberStore } from "@/store/member";
import { storeToRefs } from "pinia";
import { useAuth } from "@/store/authStore";

const route = useRoute();
const authStore = useAuth();
const { user } = storeToRefs(authStore);
const { linkGenerated, token } = storeToRefs(useMemberStore());

const toast = useToast();
const profileMenu = ref(false);
const router = useRouter();
const inviteSharing = ref(false);
const isCopying = ref(false);

const props = defineProps({
  team: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["loading", "addSouls"]);

const loggingOut = async () => {
  profileMenu.value = false;
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error("Erreur de déconnexion");
    return;
  }
  toast.success("Déconnecter avec succès");
  router.push("/login");
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

const linkGeneration = async () => {
  const inviteCode = crypto.randomUUID().slice(0, 8).toUpperCase();
  const { data, error } = await supabase.from("invites").insert({
    token: inviteCode,
    team_id: route.params.id,
    created_by: user.value.id,
    role: "admin",
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);
  if (error) {
    toast.error("Erreur lors de la génération du lien d'invitation");
    return "";
  }

  return inviteCode;
};

const handleGenerateInvite = async () => {
  inviteLink.value = await linkGeneration();

  if (inviteLink.value) {
    linkGenerated.value = true;
  }
};

const copyCode = () => {
  navigator.clipboard.writeText(inviteLink.value);
  isCopying.value = true;
  toast.success("Code d'invitation copié !");
  setTimeout(() => {
    isCopying.value = false;
  }, 2000);
};
</script>
<template>
  <nav
    :class="[
      'px-4 py-3 flex justify-between items-center',
      props.team ? 'bg-purple-50' : 'bg-purple-200',
    ]"
  >
    <RouterLink to="/">
      <div class="size-10">
        <img :src="logo" alt="logo" />
      </div>
    </RouterLink>
    <div class="flex items-center justify-between gap-5">
      <BaseButton
        variant="primary"
        @click="emit('addSouls')"
        class="hidden md:flex"
        v-if="!props.team"
      >
        <Plus />
        <span>Ajouter une âme</span>
      </BaseButton>
      <div class="cursor-pointer rounded-full w-10" @click="manageModal">
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
          v-if="!props.team"
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="openCopyInvite"
        >
          Inviter des membres
        </li>
        <hr v-if="!props.team" class="border text-gray-300" />
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="loggingOut"
        >
          Se déconnecter
        </li>
      </ul>
    </div>
    <div
      class="absolute bg-white right-3 top-18 p-2 rounded-xl z-100 flex flex-col gap-4 w-sm"
      v-show="inviteSharing"
    >
      <div v-if="!linkGenerated" class="flex flex-col gap-4">
        <span class="font-semibold text-lg">Générer un code d'accès</span>
        <BaseButton variant="primary" @click="handleGenerateInvite"> Générer </BaseButton>
      </div>
      <div v-else class="flex flex-col gap-4">
        <span class="font-semibold text-lg">Code d'accès</span>
        <div class="flex items-center gap-2 border border-gray-300 rounded-md p-1">
          <input
            type="text"
            readonly
            class="w-full cursor-default text-sm outline-0"
            v-model="token"
          />
          <div>
            <Copy
              v-if="!isCopying"
              class="cursor-pointer hover:bg-purple-200/50 p-1 size-9 border border-gray-300 rounded-md text-gray-600"
              @click="copyCode"
            />
            <CheckCheck
              v-else
              class="text-green-500 p-1 size-9 border border-gray-300 rounded-md"
              @click="
                navigator.clipboard.writeText(inviteLink);
                toast.success('Code d\'invitation copié !');
              "
            />
          </div>
        </div>
        <BaseButton variant="primary" @click="alert('Copy link')"> Copier le lien </BaseButton>
      </div>
    </div>
  </nav>
</template>
