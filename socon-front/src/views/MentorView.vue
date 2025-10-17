<script setup>
import { ref, onMounted } from 'vue';
import DataTable from '@/components/DataTable.vue';
import Sidebar from '@/components/SideBar.vue';
import ReportInput from '@/components/ReportInput.vue';
import MemberEdit from '@/components/MemberEdit.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import FilterWrapper from '@/components/FilterWrapper.vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/BaseButton.vue';
import { supabase } from '@/lib/supabaseClient';
import logo from '@/assets/logo.svg';
import { useToast } from 'vue-toastification';

const toast = useToast();
const store = useMemberStore();

const { isAll, limit, isLoading } = storeToRefs(store);

const isSidebarOpen = ref(false);
const isReporting = ref(false);
const isEditing = ref(false);
const profileMenu = ref(false);

const selectedMember = store.selectedMember;

// --- Lifecycle ---
onMounted(() => {
  store.loadMembers();
});

const handleColumnClick = () => (isSidebarOpen.value = true);
const handleReporting = () => (isReporting.value = true);
const handleSubmission = () => (isReporting.value = false);
const handleMemberEditing = () => (isEditing.value = true);

const loggingOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    toast.error('Erreur de déconnexion');
    return;
  }
  window.location.href = '/login';
  toast.success('Déconnecté avec succès');
};

const handleTab = (key) => {
  console.log(`Tab clicked: ${key}`);
};
</script>

<template>
  <!-- Navigation Bar -->
  <nav class="px-4 py-3 flex justify-between items-center border-b border-gray-200">
    <RouterLink to="/">
      <div class="size-14">
        <img :src="logo" alt="logo" />
      </div>
    </RouterLink>

    <div
      class="size-14 bg-gray-300 rounded-full cursor-pointer"
      @click="profileMenu = !profileMenu"
    ></div>

    <div class="absolute bg-white right-3 top-25 p-2 rounded-xl z-100 shadow-lg" v-if="profileMenu">
      <ul class="flex flex-col gap-2 w-fit">
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
        >
          Mon Profil
        </li>
        <li
          class="py-1 px-2 hover:bg-purple-200/40 cursor-pointer rounded-md transition-all font-medium hover:text-purple-500"
          @click="loggingOut"
        >
          Se déconnecter
        </li>
      </ul>
    </div>
  </nav>

  <!-- Main Section -->
  <main class="min-h-screen flex flex-col gap-6">
    <!-- Filter -->
    <div class="flex items-center justify-center w-full mt-6">
      <FilterWrapper @tab-clicked="(key) => handleTab(key)" />
    </div>

    <!-- Data -->
    <div v-if="isLoading" class="flex justify-center items-center p-8">
      <LoadingSpinner size="lg" />
    </div>
    <div v-else-if="!hasMember" class="flex justify-center items-center p-8 mx-auto">
      <p class="text-gray-500 text-xl mt-10">Aucun membre trouvé.</p>
    </div>
    <div
      v-else
      class="px-4 md:p-8 max-w-7xl mx-auto w-full overflow-scroll flex flex-col items-center"
    >
      <DataTable @column-click="handleColumnClick" />

      <BaseButton
        v-if="!isAll"
        variant="tertiary"
        :width="false"
        :rounded="true"
        :margin="true"
        class="text-purple-900 hover:text-purple-800"
        @click="store.showMore(limit)"
      >
        Plus
      </BaseButton>
    </div>

    <!-- Sidebar & Modals -->
    <Sidebar
      v-if="isSidebarOpen"
      :member="selectedMember"
      @close="isSidebarOpen = false"
      @addReport="handleReporting"
      @editMember="handleMemberEditing"
    />
    <ReportInput
      v-if="isReporting"
      @close="isReporting = false"
      @reportSubmission="handleSubmission"
    />
    <MemberEdit v-if="isEditing" @close="isEditing = false" />
  </main>
</template>
