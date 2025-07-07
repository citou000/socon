<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  member: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close', 'save'])

const name = ref('')
const formation = ref('')
const mentor = ref('')
const baptismStatus = ref(false)

watch(
  () => props.member,
  (val) => {
    if (val) {
      name.value = val.name
      formation.value = val.formation
      mentor.value = val.mentor
      baptismStatus.value = val.baptismStatus
    }
  },
  { immediate: true }
)

const handleSave = () => {
  const updatedMember = {
    ...props.member,
    name: name.value,
    formation: formation.value,
    mentor: mentor.value,
    baptismStatus: baptismStatus.value,
  }
  emit('save', updatedMember)
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div class="md:w-[40%] bg-white rounded-lg p-6 shadow-xl relative flex flex-col gap-4">
      <X class="size-6 top-4 right-4 cursor-pointer hover:text-red-500" @click="close" />

      <h2 class="text-3xl font-bold text-purple-900 mb-2">Modifier le membre</h2>

      <div class="flex flex-col gap-3">
        <label class="text-sm font-semibold text-gray-600">Nom</label>
        <input v-model="name" type="text" class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400" />

        <label class="text-sm font-semibold text-gray-600">Formation</label>
        <input v-model="formation" type="text" class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400" />

        <label class="text-sm font-semibold text-gray-600">Mentor</label>
        <input v-model="mentor" type="text" class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400" />

        <label class="text-sm font-semibold text-gray-600">Baptisé</label>
        <select v-model="baptismStatus" class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400">
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </select>
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <BaseButton @click="close">Annuler</BaseButton>
        <BaseButton :bg="'bg-purple-600'" :hoverBg="'bg-purple-700'" :color="'text-white'" @click="handleSave">
          Enregistrer
        </BaseButton>
      </div>
    </div>
  </div>
</template>
