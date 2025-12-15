<script setup>
import { X } from 'lucide-vue-next';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const store = useMemberStore();

const { selectedMember } = storeToRefs(store);

const report = ref('');

const emit = defineEmits(['close', 'reportSubmission']);

const handleSubmission = async () => {
  console.log('report', report.value);
  console.log('id', selectedMember.value.id);
  await store.handleReporting(selectedMember.value.id, report.value);
  report.value = ''; // Clear the input after submission
  emit('reportSubmission');
};

if (import.meta.env.VITE_APP_ENV === 'development') {
  console.log('ReportInput component loaded');
}

const close = () => {
  console.log('Closing ReportInput');
  emit('close');
};
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40 p-5"
  >
    <div class="md:w-[40%] bg-white rounded-lg p-6 shadow-xl relative flex flex-col gap-4">
      <X
        class="size-6 cursor-pointer hover:text-red-500 font-bold transition-colors duration-100"
        @click="$emit('close')"
      />
      <h3 class="text-3xl font-bold">Soumettre un rapport</h3>
      <div>
        <textarea
          name="report"
          id=""
          class="w-full border-2 border-purple-200 outline-0 p-1 text-sm resize-none h-32 rounded-lg focus:border-purple-500 transition-colors duration-300"
          autofocus
          placeholder="Écrivez votre rapport ici..."
          v-model="report"
          :maxlength="500"
          :rows="4"
          :cols="50"
        ></textarea>
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <BaseButton @click="close" variant="tertiary">Annuler</BaseButton>
        <BaseButton variant="primary" @click="handleSubmission">Soumettre</BaseButton>
      </div>
    </div>
  </div>
</template>
