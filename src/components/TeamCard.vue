<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
    <h2 class="text-xl font-semibold text-gray-800">{{ name }}</h2>
    <p class="text-gray-600 mt-2">{{ description }}</p>
  </div>
</template>
