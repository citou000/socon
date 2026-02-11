<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import NavBar from '@/components/NavBar.vue';
import { Search, Plus } from 'lucide-vue-next';
import TeamCard from '@/components/TeamCard.vue';
// import { useMemberStore } from '@/store/member';
import AddTeam from '@/components/AddTeam.vue';
import { supabase } from '@/lib/supabaseClient';

// const memberStore = useMemberStore();
const isEmpty = ref(false);
const isClosed = ref(true);
const closeModal = () => {
  isClosed.value = true;
};
</script>

<template>
  <div class="h-full flex flex-col items-center flex-1">
    <section class="w-full">
      <NavBar :team="true" />
    </section>

    <section class="mt-12 w-full max-w-5xl px-6 h-full">
      <h2 class="text-5xl font-bold mb-8">Vos équipes</h2>

      <div class="flex items-center justify-between gap-4">
        <!-- <div -->
        <!--   class="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm focus-within:border-purple-400 transition-all"> -->
        <!--   <Search size="18" class="text-gray-500 mr-2" /> -->
        <!--   <input type="text" placeholder="Rechercher" class="bg-transparent border-none outline-none w-full text-sm" /> -->
        <!-- </div> -->

        <BaseButton variant="primary" :width="false" class="whitespace-nowrap" @click="isClosed = false">
          <Plus />
          Ajouter une équipe
        </BaseButton>
      </div>

      <div class="mt-8 h-full">
        <div
          class="mt-8 border-2 border-dashed border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400"
          v-if="isEmpty">
          Pas d'équipe pour le moment
        </div>

        <div v-else class="grid md:grid-cols-3 md:gap-8 gap-2">
          <TeamCard name="Équipe Alpha" description="Description de l'équipe Alpha" />
          <TeamCard name="EJP Adidogomé" description="L'église des jeunes prodiges d'adidogomé" />
        </div>
        <AddTeam @close="closeModal()" v-if="!isClosed" />
      </div>
    </section>
  </div>
</template>
