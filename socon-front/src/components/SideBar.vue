<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-end">
    <div
      class="bg-white w-1/3 h-full p-6 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col"
    >
      <div class="flex justify-between items-center mb-4">
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
        >
          ×
        </button>
      </div>

      <div v-if="props.member" class="space-y-4">
        <h2 class="font-bold text-5xl text-purple-800 flex justify-between">
          {{ member.name }}
        </h2>
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Formation:</span> {{ member.formation }}
        </p>
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Mentor:</span> {{ member.mentor }}
        </p>
        <p class="font-bold flex justify-between items-center">
          <span class="font-semibold text-gray-600">Baptisé:</span>
          <span
            :class="[
              'border',
              'py-1',
              'px-4',
              'rounded-full',
              member.baptismStatus
                ? 'border-green-500 text-green-500 bg-green-400/10'
                : 'border-red-500 text-red-500 bg-red-400/10',
            ]"
          >
            {{ member.baptismStatus ? 'Oui' : 'Non' }}
          </span>
        </p>

        <!-- Summary Section -->
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Détails</span>
        </p>

        <!-- Use your custom Accordion -->
        <Accordion class="border-t-2 border-gray-300">
          <AccordionItem v-for="(report, week) in member.details" :key="week" :title="week">
            <p>{{ report }}</p>
          </AccordionItem>
        </Accordion>

        <button class="py-2 w-full text-gray-500 font-bold cursor-pointer" @click="$emit('add-report')">
          <span>+</span>
          Ajouter un rapport
        </button>
      </div>

      <div class="flex justify-end h-full items-end">
        <button
          class="px-4 py-2 bg-purple-900 rounded-md font-bold text-white cursor-pointer hover:bg-purple-700 transition-all"
        >
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Accordion from '@/components/Accordion.vue'
import AccordionItem from '@/components/AccordionItem.vue'

const props = defineProps({
  member: {
    type: Object,
    default: null,
  },
})
</script>
