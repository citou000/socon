<script setup>
import { X } from 'lucide-vue-next'
import BaseButton from '@/components/BaseButton.vue'
import { ref } from 'vue'

const report = ref('')

const emit = defineEmits(['close', 'reportSubmission'])

const handleSubmission = () => {
  console.log('[SUBMIT]', report.value)

  if (report.value.trim() === '') {
    alert('Le rapport ne peut pas être vide.')
    return
  }
  emit('reportSubmission', report.value)
  report.value = '' // Clear the input after submission
}

if (import.meta.env.VITE_APP_ENV === 'development') {
  console.log('ReportInput component loaded')
}

const close = () => {
  console.log('Closing ReportInput')
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-40">
    <div class="w-[30%] mx-auto bg-white py-8 px-6 rounded-lg flex flex-col gap-4">
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
        <BaseButton
          :bg="'bg-purple-600'"
          :hoverBg="'bg-purple-700'"
          :color="'text-white'"
          @click="handleSubmission"
          >Soumettre</BaseButton
        >
        <BaseButton @click="close">Annuler</BaseButton>
      </div>
    </div>
  </div>
</template>
