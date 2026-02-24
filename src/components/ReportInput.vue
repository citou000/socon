<script setup>
import { X } from 'lucide-vue-next';
import BaseButton from '@/components/BaseButton.vue';
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';
import LoadingSpinner from './LoadingSpinner.vue';

const store = useMemberStore();

const { selectedMember } = storeToRefs(store);

const report = ref('');
const isReporting = ref(false);

const textareaRef = ref(null);

const emit = defineEmits(['close', 'reportSubmission']);

const handleSubmission = async () => {
  isReporting.value = true;
  await store.handleReporting(selectedMember.value.id, report.value);
  report.value = '';
  emit('reportSubmission');
};

const close = () => {
  emit('close');
};

onMounted(() => {
  textareaRef.value.focus();
});
</script>

<template>
  <div
    class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40 p-5"
  >
    <div class="md:w-[40%] bg-white rounded-lg px-6 py-4 shadow-xl relative flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h3 class="text-3xl font-bold">Soumettre un rapport</h3>
        <X
          class="size-6 cursor-pointer hover:text-red-500 font-bold transition-colors duration-100"
          @click="$emit('close')"
        />
      </div>
      <form @submit.prevent="handleSubmission">
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
            ref="textareaRef"
          ></textarea>
        </div>
        <div class="flex justify-end gap-4 mt-4">
          <BaseButton @click="close" variant="secondary" type="">Annuler</BaseButton>
          <BaseButton
            variant="primary"
            @click="handleSubmission"
            :disabled="isReporting || report.trim() === ''"
            type="submit"
          >
            <span v-if="isReporting">
              <LoadingSpinner size="xs" />
            </span>
            <span v-else>Soumettre</span>
          </BaseButton>
        </div>
      </form>
    </div>
  </div>
</template>
