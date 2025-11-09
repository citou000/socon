<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from 'vue-toastification';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import BaseButton from '@/components/BaseButton.vue';
import { Users, Plus } from 'lucide-vue-next';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const teams = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const showCreate = ref(false);
const newTeamName = ref('');
const toast = useToast();
const teamNameInput = ref(null);

const { teamId } = storeToRefs(useMemberStore);

console.log(teamId);

watch(showCreate, async (value) => {
  if (value) {
    await nextTick();
    teamNameInput.value?.focus();
  }
});

async function getUserId() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user || null;
}

async function fetchTeams() {
  loading.value = true;
  teams.value = [];
  try {
    const userId = await getUserId();
    console.log(userId);
    if (!userId.id) {
      toast.error('Utilisateur non connecté.');
      loading.value = false;
      return;
    }

    let query = supabase
      .from('teams')
      .select('*')
      .eq('owner', userId.id)
      .order('id', { ascending: false });

    if (searchQuery.value && searchQuery.value.trim() !== '') {
      // use ilike for case-insensitive partial match
      query = supabase
        .from('teams')
        .select('*')
        .eq('owner', userId.id)
        .ilike('name', `%${searchQuery.value.trim()}%`)
        .order('id', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    teams.value = data || [];
    console.log(teams.value);
  } catch (err) {
    console.error(err);
    toast.error('Erreur lors de la récupération des équipes.');
  } finally {
    loading.value = false;
  }
}

async function createTeam() {
  if (!newTeamName.value || !newTeamName.value.trim()) {
    toast.error("Le nom de l'équipe est requis.");
    return;
  }

  try {
    loading.value = true;
    const userId = await getUserId();
    if (!userId.id) {
      toast.error('Utilisateur non connecté.');
      return;
    }

    const payload = {
      name: newTeamName.value.trim(),
      owner: userId.id,
    };

    const { data, error } = await supabase.from('teams').insert(payload).select().single();
    if (error) throw error;

    // refresh list or prepend new team
    teams.value = [data, ...teams.value];
    toast.success('Équipe créée avec succès.');
    newTeamName.value = '';
    showCreate.value = false;
  } catch (err) {
    console.error(err);
    toast.error("La création de l'équipe a échoué.");
  } finally {
    loading.value = false;
  }
}

const setTeam = (teamId) => {
  console.log('Set Team called successfully !');
  localStorage.setItem('teamId', teamId);
  console.log("Team Id:",localStorage.getItem('teamId'));
};

onMounted(() => {
  fetchTeams();
});
</script>

<template>
  <main class="min-h-screen flex flex-col gap-4">
    <div
      class="absolute z-50 w-screen h-screen bg-gray-500/50 flex items-center justify-center p-4 backdrop-blur"
      v-if="showCreate"
    >
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <form class="space-y-4" @submit.prevent="createTeam">
          <div>
            <label for="organisation">Nom de l'équipe</label>
            <input
              id="organisation"
              ref="teamNameInput"
              v-model="newTeamName"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              placeholder="Entrez le nom de l'équipe"
              required
            />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <BaseButton variant="secondary" @click="showCreate = false" type="button">
              Annuler
            </BaseButton>
            <BaseButton variant="primary" type="submit"> Créer </BaseButton>
          </div>
        </form>
      </div>
    </div>
    <div class="text-purple-900 w-full py-7">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between w-full mt-30 mb-10">
          <h1 class="text-5xl font-semibold">Équipes</h1>
          <BaseButton variant="primary" :width="false" @click="showCreate = true">
            <Plus />
            Créer une équipe
          </BaseButton>
        </div>
      </div>
    </div>

    <div class="px-4 max-w-7xl mx-auto w-full">
      <div v-if="loading" class="flex justify-center items-center p-8">
        <LoadingSpinner size="lg" />
      </div>

      <div v-else-if="teams.length === 0" class="text-center py-12">
        <Users class="mx-auto h-12 w-12 text-purple-300" />
        <h3 class="mt-2 text-lg font-medium text-gray-900">Aucune équipe</h3>
        <p class="mt-1 text-gray-500">Commencez par créer une nouvelle équipe.</p>
      </div>

      <div v-else class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <div
          v-for="team in teams"
          :key="team.id"
          @click="setTeam(team.id)"
          class="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:border-purple-300 transition-all cursor-pointer w-sm"
        >
          <div class="flex items-start justify-start mb-3 flex-col">
            <h3 class="text-lg font-semibold text-purple-900">{{ team.name }}</h3>
          </div>

          <p class="mt-2 text-sm text-gray-600">
            Propriétaire:
            <span class="font-medium text-gray-800 break-words">{{ team.owner }}</span>
          </p>

          <div class="mt-4 flex items-center text-sm text-gray-500">
            <Users class="h-4 w-4 mr-1" />
            <span>{{ team.members_count || 0 }} membres</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
