<script setup>
import Accordion from '@/components/AccordionWrapper.vue';
import AccordionItem from '@/components/AccordionItem.vue';
import { useMemberStore } from '@/store/member';
import { X } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['close', 'addReport', 'editMember']);

const store = useMemberStore();

const { selectedMember: member } = storeToRefs(store);
console.log(member.value);

const close = () => {
  console.log('Closing the Sidebar');
  emit('close');
};

const addReport = () => {
  console.log('Adding a report');
  emit('addReport');
};

const editMember = () => {
  emit('editMember');
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-end">
    <div
      class="bg-white w-full md:w-1/3 h-screen p-6 shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0 flex flex-col"
    >
      <div class="flex justify-between items-center mb-4">
        <button @click="close" class="text-gray-500 hover:text-red-600 text-2xl cursor-pointer">
          <X />
        </button>
      </div>

      <div v-if="member" class="space-y-4 flex flex-col">
        <h2 class="font-bold text-5xl text-purple-800 flex justify-between">
          {{ member.name }}
        </h2>
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Quartier:</span> {{ member.neighborhood }}
        </p>
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Contact</span>
          <a :href="`tel: ${member.contact}`">{{ member.contact }}</a>
        </p>
        <p class="font-bold flex justify-between items-center">
          <span class="font-semibold text-gray-600">Prière du salut:</span>
          <span
            :class="[
              'py-1',
              'px-4',
              'rounded-sm',
              member.salvationStatus
                ? 'text-green-500 bg-green-400/10'
                : 'text-red-500 bg-red-400/10',
            ]"
          >
            {{ member.salvationStatus ? 'Oui' : 'Non' }}
          </span>
        </p>

        <!-- Summary Section -->
        <p class="font-bold flex justify-between">
          <span class="font-semibold text-gray-600">Détails</span>
        </p>

        <div>
          <Accordion v-if="member.details.length > 0" class="border-t-2 border-gray-300">
            <AccordionItem
              v-for="(detail, index) in member.details"
              :key="index"
              :title="`Semaine ${index + 1}`"
            >
              <p class="text-gray-700 whitespace-pre-line">{{ detail.report }}</p>
            </AccordionItem>
          </Accordion>
          <p v-else class="text-gray-500 italic text-center">Aucun rapport disponible</p>
        </div>

        <button
          class="py-2 w-fit self-center text-gray-500 font-bold cursor-pointer hover:bg-gray-400/20 px-2 rounded-sm"
          @click="addReport"
        >
          <span>+</span>
          Ajouter un rapport
        </button>
      </div>

      <div class="flex justify-end h-full items-end">
        <button
          class="px-4 py-2 bg-purple-900 rounded-sm font-bold text-white cursor-pointer hover:bg-purple-700 transition-all"
          @click="editMember"
        >
          Modifier
        </button>
      </div>
    </div>
  </div>
</template>
