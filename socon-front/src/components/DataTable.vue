<template>
  <div class="relative bg-purple-50 px-8 pt-4 rounded-t-lg">
    <!-- Data Table -->
    <table class="w-full text-sm px-2">
      <thead class="rounded-t-lg px-2">
        <tr>
          <th
            v-for="(header, index) in props.headers"
            :key="header"
            class="p-2 text-left font-semibold hover:bg-gray-200 cursor-pointer text-xl border-b-2 border-gray-300"
            @click="handleColumnClick(index)"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="member in props.data"
          :key="member.id"
          class="hover:bg-gray-100 cursor-pointer border-b-2 border-gray-300 justify-items-center"
          @click="selectMemberAndEmit(member)"
        >
          <td class="p-3 font-semibold text-md">
            {{ member.name }}
          </td>
          <td class="p-3 text-gray-600">
            {{ member.formation }}
          </td>
          <td class="p-3">
            {{ member.mentor }}
          </td>
          <td class="p-3 text-center">
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
          </td>
          <td class="p-3">
            <div :key="index">
              {{
                Object.entries(member.details)[Object.entries(member.details).length - 1][1] ||
                'Aucun rapport pour la 1ère semaine'
              }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

// Props: Expect an array of data objects and headers
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  headers: {
    type: Array,
    required: true,
  },
})

// State for selected member and accordion
const selectedMember = ref(null)

// Emits: Notify parent of column click with selected member and column index
const emit = defineEmits(['column-click'])

// Toggle accordion visibility
// const toggleAccordion = (week, event) => {
//   isOpen.value[week] = !isOpen.value[week]
//   event.stopPropagation() // Prevent row click from triggering
// }

// Select a member and emit the event
const selectMemberAndEmit = (member) => {
  selectedMember.value = member
  emit('column-click', { member: selectedMember.value, columnIndex: null })
}

// Handle column header click
const handleColumnClick = (columnIndex) => {
  if (!selectedMember.value) {
    alert('Veuillez sélectionner un membre en cliquant sur une ligne.')
    return
  }
  emit('column-click', { member: selectedMember.value, columnIndex })
}

// Clear selection on Escape key
const handleEsc = (e) => {
  if (e.key === 'Escape') {
    selectedMember.value = null
  }
}
window.addEventListener('keydown', handleEsc)

// Cleanup event listener
onUnmounted(() => {
  window.removeEventListener('keydown', handleEsc)
})
</script>
