import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMemberStore = defineStore('member', () => {
  const allMembers = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedMember = ref(null);
  const limit = ref(25);
  const isAll = ref(false);

  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails']);

  const loadMembers = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch('/data.json'); // ✅ Correct path
      if (!res.ok) throw new Error('Impossible de charger les données');

      allMembers.value = await res.json();
      console.log('Loaded members:', allMembers.value); // Debug
    } catch (err) {
      error.value = err.message;
      console.error('Fetch error:', err);
    } finally {
      loading.value = false;
    }
  };

  const stats = computed(() => {
    const souls = allMembers.value.length;
    const saved = allMembers.value.filter((m) => m.salvationStatus).length;
    const notSaved = souls - saved;
    return { souls, saved, notSaved };
  });
  const keys = ref({
    souls: 'Âmes',
    saved: 'Ont fait la prière du salut',
    notSaved: "N'ont pas fait la prière du salut",
  });

  function selectMember(member) {
    selectedMember.value = member;
  }

  function updateMember(updatedMember) {
    const index = allMembers.value.findIndex((m) => m.id === updatedMember.id);
    if (index !== -1) {
      allMembers.value[index] = { ...updatedMember };
      selectedMember.value = allMembers.value[index];
    }
  }

  // function updateMember(updatedMember) {
  //   const index = members.value.findIndex((m) => m.id === updatedMember.id)
  //   if (index !== -1) {  // const listMembers = computed(() => {
  //   return members.value.slice(0, limit);
  // });

  // const showMore = (actualLimit) => {
  //   const inc = 15;
  //   if (actualLimit >= members.value.length || members.value.length - actualLimit < inc) {
  //     return actualLimit + (members.value.length - actualLimit);
  //   }
  //   return (actualLimit += inc);
  // };
  // console.log(members.value);
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

  const members = computed(() => {
    return allMembers.value.slice(0, limit.value);
  });

  const showMore = (actualLimit) => {
    const inc = 15;
    if (actualLimit >= allMembers.value.length || allMembers.value.length - actualLimit < inc) {
      isAll.value = true;
      limit.value + (allMembers.value.length - actualLimit);
      return;
    }
    limit.value += inc;
    return;
  };
  console.log(allMembers.value);

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
    keys,
    showMore,
    isAll,
    limit,
  };
});
