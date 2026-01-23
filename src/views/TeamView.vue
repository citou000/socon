<script setup>
import BaseButton from '@/components/BaseButton.vue';
import NavBar from '@/components/NavBar.vue';
import { Search, Plus } from 'lucide-vue-next';
import { supabase } from '@/lib/supabaseClient';
</script>

<template>
  <div class="h-full flex flex-col items-center flex-1">
    <section class="w-full">
      <NavBar />
    </section>

    <section class="mt-12 w-full max-w-5xl px-6 h-full">
      <h3 class="text-3xl font-bold mb-8">Vos équipes</h3>

      <div class="flex items-center justify-between gap-4">
        <div
          class="flex items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 w-full max-w-sm focus-within:border-purple-400 transition-all"
        >
          <Search size="18" class="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Rechercher"
            class="bg-transparent border-none outline-none w-full text-sm"
          />
        </div>

        <BaseButton variant="primary" :width="false" class="whitespace-nowrap">
          <Plus />
          Ajouter une équipe
        </BaseButton>
      </div>

      <div
        class="mt-8 border-2 border-dashed border-gray-200 rounded-xl h-64 flex items-center justify-center text-gray-400"
      >
        La liste des équipes apparaîtra ici
      </div>
    </section>
  </div>
</template>
