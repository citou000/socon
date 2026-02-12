<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="bg-purple-100 rounded-xl border-2 border-purple-200 p-4 text-purple-900 flex flex-col gap-2 text-balance cursor-pointer hover:bg-purple-200 transition-colors duration-300"
  >
    <h2 class="text-md font-semibold">{{ name }}</h2>
  </div>
</template>
