import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';

export const useMemberStore = defineStore('member', () => {
  const allMembers = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const selectedMember = ref(null);
  const limit = ref(25);
  const isAll = ref(false);
  const details = ref();

  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails']);

  const loadMembers = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await supabase.from('souls').select(`*`);
      const { data: detail } = await supabase.from('details').select(`details`);
      allMembers.value = data;
      details.value = detail;

      const sample = details.value.map((m) => {
        return JSON.parse(m.details);
      });
      console.log('Details', sample);
      allMembers.value = allMembers.value.map((m) => ({
        ...m,
        details: sample[m.id],
      }));
      console.log('Loaded members:', allMembers.value);
    } catch (err) {
      error.value = err.message;
      console.error('Fetch error:', err);
    } finally {
      isLoading.value = false;
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

  const updateMember = async (id, updates) => {
    const { data, error } = await supabase.from('souls').update(updates).eq('id', id).select();

    if (error) throw error;

    const updated = data[0]; // the updated row

    // update local list
    const index = allMembers.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      allMembers.value.splice(index, 1, data[0]);
    }

    // update selectedMember if it's the same one
    if (selectedMember.value?.id === id) {
      selectedMember.value = updated;
    }

    return updated;
  };

  const members = computed(() => {
    return allMembers.value.slice(0, limit.value);
  });

  const showMore = (actualLimit) => {
    const inc = 15;
    if (actualLimit >= allMembers.value.length || limit.value >= allMembers.value.length) {
      // We've shown all members
      isAll.value = true;
    }

    // Calculate how many more items we can show
    const remaining = allMembers.value.length - limit.value;
    // Add either the increment or all remaining items if less than increment
    limit.value += Math.min(inc, remaining);
    console.log(remaining);
  };

  console.log(allMembers.value);
  console.log(members.value);

  return {
    members,
    headers,
    stats,
    isLoading,
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
