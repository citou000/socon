<script setup>

import { ref } from 'vue';

const dashboardOption = ref({
  'Baptisés': 50,
  'Âmes': 100,
  'Suivis': 50});


</script>

<template>
  <main class="w-full h-full">
    <div class="h-[40%] bg-purple-100 text-purple-900 flex">
      <div class="w-full flex items-center justify-around h-full px-8">
        <div v-for="(v,k) in dashboardOption" :key="k" class="flex flex-col items-start justify-around w-fit cursor-pointer p-8">
        <span class="self-start text-md font-mono font-bold">{{ k }}</span>
        <span class="text-9xl">{{ v }}</span>
      </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      This is the table place
    </div>
  </main>
</template>
