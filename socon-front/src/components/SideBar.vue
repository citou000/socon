<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
    <div
      class="bg-white w-1/3 h-full p-6 pt-2 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
    >
      <div class="flex justify-start items-center mb-4">
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          x
        </button>
      </div>
      <div v-if="member" class="flex flex-col gap-3">
        <h1 class="text-5xl font-bold my-6">{{ member.name }}</h1>
        <p class="w-[60%] flex justify-between items-center">
          <span class="text-gray-500 font-semibold">Formation</span>
          <span>{{ member.formation }}</span>
        </p>
        <p class="w-[60%] flex justify-between items-center">
          <span class="text-gray-500 font-semibold">Mentor</span>
          <span>{{ member.mentor }}</span>
        </p>
        <p class="w-[60%] flex justify-between items-center">
          <span class="text-gray-500 font-semibold">Baptisé</span>
          <span
            :class="[
              'border',
              'py-1',
              'px-2',
              'rounded-full',
              member.baptismStatus
                ? 'border-green-500 text-green-500 bg-green-400/10'
                : 'border-red-500 text-red-500 bg-red-400/10',
            ]"
          >
            {{ member.baptismStatus ? 'Oui' : 'Non' }}
          </span>
        </p>
        <p class="text-sm font-semibold">{{ member.details }}</p>
      </div>
      <p v-else class="text-gray-500">Aucun membre sélectionné.</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// Props
const props = defineProps({
  member: {
    type: Object,
    default: null,
  },
})

// Computed property to access headers (assuming passed from App.vue context)
</script>
