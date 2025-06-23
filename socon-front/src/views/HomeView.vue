<script setup>

import { ref } from 'vue';

const dashboardOption = ref({
  'Baptisés': 50,
  'Âmes': 100,
  'Suivis': 50});


</script>

<template>
  <main class="w-full h-screen bg-purple-100">
    <div class="h-[40%] bg-purple-200 text-purple-900 flex">
      <div class="w-full flex items-center justify-around h-full px-8">
        <div v-for="(k, v) in dashboardOption" :key="dashboardItem" class="flex flex-col items-start justify-around w-fit cursor-pointer bg-white p-8">
        <span class="self-start text-md">{{ v }}</span>
        <span class="text-9xl">{{ k }}</span>
      </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      This is the table place
    </div>
  </main>
</template>
