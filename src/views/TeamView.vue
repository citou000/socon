<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import NavBar from '@/components/NavBar.vue';
import { Plus } from 'lucide-vue-next';
import TeamCard from '@/components/TeamCard.vue';
import { useMemberStore } from '@/store/member';
import AddTeam from '@/components/AddTeam.vue';
import { storeToRefs } from 'pinia';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import router from '@/router';

const memberStore = useMemberStore();
const { teams } = storeToRefs(memberStore);
const isEmpty = computed(() => !teams.value || teams.value.length === 0);
const isClosed = ref(true);
const closeModal = () => {
  isClosed.value = true;
};
const loading = ref(true);

const gotoTeam = (id) => {
  console.log('Go to team with id:', id);
  localStorage.setItem('currentTeamId', id);
  router.push(`/dashboard/${id}`);
};

onMounted(async () => {
  await memberStore.loadTeams();
  loading.value = false;
});
</script>

<template>
  <div class="h-full flex flex-col items-center flex-1">
    <section class="w-full">
      <NavBar :team="true" />
    </section>

    <section class="mt-12 w-full max-w-5xl px-6 h-full">
      <h2 class="text-5xl font-bold mb-8">Vos équipes</h2>

      <div class="flex items-center justify-between gap-4">
        <BaseButton
          variant="primary"
          :width="false"
          class="whitespace-nowrap"
          @click="isClosed = false"
        >
          <Plus />
          Ajouter une équipe
        </BaseButton>
      </div>

      <div class="mt-8 h-full">
        <div v-if="loading" class="mt-8 h-full flex items-center justify-center text-gray-400">
          <LoadingSpinner />
        </div>
        <div
          v-else-if="isEmpty"
          class="mt-8 border-2 border-dashed border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400"
        >
          Pas d'équipe pour le moment
        </div>
        <div v-else class="grid md:grid-cols-3 md:gap-6 gap-2">
          <TeamCard
            v-for="team in teams"
            :key="team.id"
            :name="team.name"
            @click="gotoTeam(team.id)"
          />
        </div>
        <AddTeam @close="closeModal()" v-if="!isClosed" />
      </div>
    </section>
  </div>
</template>
