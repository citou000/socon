<script setup>
import BaseButton from '@/components/BaseButton.vue';
import { X } from 'lucide-vue-next';

const emit = defineEmits(['close']);
</script>
<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40">
    <div class="flex flex-col items-start px-6 pt-4 pb-9 bg-white rounded-lg max-w-md md:w-[40%]">
      <div class="w-full mb-4 flex justify-between items-center">
        <section>
          <h2 class="text-3xl font-bold">Ajouter une équipe</h2>
          <p class="text-sm">
            Les champs marqués par <span class="text-red-500">*</span> sont obligatoires
          </p>
        </section>
        <section>
          <X
            class="size-6 cursor-pointer hover:text-red-500 font-bold transition-colors duration-100"
            @click="$emit('close')"
          />
        </section>
      </div>
      <form class="w-full flex flex-col gap-4">
        <div class="flex flex-col self-center w-full">
          <label for="team-name">Nom de l'équipe <sup class="text-red-500">*</sup></label>
          <input
            type="text"
            id="team-name"
            name="team-name"
            required
            class="border-1 border-purple-200 px-1 py-2 rounded-md"
          />
        </div>

        <div class="flex flex-col">
          <label for="team-description">Description de l'équipe</label>
          <textarea
            id="team-description"
            name="team-description"
            class="border-1 border-purple-200 px-1 py-2 rounded-md w-full resize-none columns-1"
          ></textarea>
        </div>

        <BaseButton type="submit" variant="primary">Créer l'équipe</BaseButton>
      </form>
    </div>
  </div>
</template>
