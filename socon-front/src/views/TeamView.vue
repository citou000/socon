<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from 'vue-toastification';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import BaseButton from '@/components/BaseButton.vue';
import { Users, Search, Plus } from 'lucide-vue-next';

const teams = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const showCreate = ref(false);
const newTeamName = ref('');
const toast = useToast();

async function getUserId() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id || null;
}

async function fetchTeams() {
  loading.value = true;
  teams.value = [];
  try {
    const userId = await getUserId();
    if (!userId) {
      toast.error('Utilisateur non connecté.');
      loading.value = false;
      return;
    }

    let query = supabase
      .from('teams')
      .select('*')
      .eq('owner', userId)
      .order('id', { ascending: false });

    if (searchQuery.value && searchQuery.value.trim() !== '') {
      // use ilike for case-insensitive partial match
      query = supabase
        .from('teams')
        .select('*')
        .eq('owner', userId)
        .ilike('name', `%${searchQuery.value.trim()}%`)
        .order('id', { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;
    teams.value = data || [];
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
    if (!userId) {
      toast.error('Utilisateur non connecté.');
      return;
    }

    showCreate.value = false;

    const payload = {
      name: newTeamName.value.trim(),
      owner: userId,
      // optional fields depending on your schema
      members_count: 0,
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
              v-model="newTeamName"
              type="text"
              class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
              placeholder="Entrez le nom de l'équipe"
            />
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <BaseButton variant="secondary" @click="showCreate = false"> Annuler </BaseButton>
            <BaseButton variant="primary" @click="createTeam"> Créer </BaseButton>
          </div>
        </form>
      </div>
    </div>
    <div class="text-purple-900 w-full py-7">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between w-full mt-30 mb-10">
          <h1 class="text-3xl font-semibold">Équipes</h1>
        </div>
        <div class="mt-4 flex items-center justify-end gap-2 w-full">
          <div class="relative flex-1 justify-end">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher une équipe..."
              class="pl-10 pr-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/80 backdrop-blur"
            />
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
          </div>
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

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        <div
          v-for="team in teams"
          :key="team.id"
          class="bg-white p-6 rounded-xl shadow-sm border border-purple-100 hover:border-purple-300 transition-all cursor-pointer"
        >
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-purple-900">{{ team.name }}</h3>
            <span class="text-sm text-purple-500 font-medium">#{{ team.id }}</span>
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

  <!-- Create Modal -->
  <div
    v-if="showCreate"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-xl p-6 max-w-md w-full">
      <h2 class="text-xl font-semibold text-purple-900 mb-4">Créer une nouvelle équipe</h2>

      <div class="space-y-4">
        <div>
          <label for="team-name" class="block text-sm font-medium text-gray-700">
            Nom de l'équipe
          </label>
          <input
            id="team-name"
            v-model="newTeamName"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            placeholder="Entrez le nom de l'équipe"
          />
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <BaseButton variant="secondary" @click="showCreate = false">
            Annuler
          </BaseButton>
          <BaseButton variant="primary" @click="createTeam"> Créer </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
