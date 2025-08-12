import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMemberStore = defineStore('member', () => {
  const members = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedMember = ref(null)

  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails'])

  const loadMembers = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/data.json') // ✅ Correct path
      if (!res.ok) throw new Error('Impossible de charger les données')

      members.value = await res.json()
      console.log('Loaded members:', members.value) // Debug
    } catch (err) {
      error.value = err.message
      console.error('Fetch error:', err)
    } finally {
      loading.value = false
    }
  }

  const stats = computed(() => {
    const souls = members.value.length
    const saved = members.value.filter((m) => m.salvationStatus).length
    const notSaved = souls - saved
    return { souls, saved, notSaved }
  })

  function selectMember(member) {
    selectedMember.value = member
  }

  function updateMember(updatedMember) {
    const index = members.value.findIndex((m) => m.id === updatedMember.id)
    if (index !== -1) {
      members.value[index] = { ...updatedMember }
      selectedMember.value = members.value[index]
    }
  }

  // function updateMember(updatedMember) {
  //   const index = members.value.findIndex((m) => m.id === updatedMember.id)
  //   if (index !== -1) {
  //     // Replace the whole object so Vue detects change
  //     members.value.splice(index, 1, { ...updatedMember })

  //     // Also update selectedMember to the new object
  //     selectedMember.value = members.value[index]
  //   }
  // }

  // function updateMember(updatedMember) {
  //   const index = members.value.findIndex((m) => m.id === updatedMember.id) // Use ID
  //   if (index !== -1) {
  //     members.value[index] = { ...updatedMember }
  //     selectedMember.value = members.value[index]
  //   }
  // }

  loadMembers()
  console.log(members.value)

  return {
    members,
    headers,
    stats,
    loading,
    error,
    loadMembers,
    selectMember,
    selectedMember,
    updateMember,
  }
})
