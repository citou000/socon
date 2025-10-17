import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from 'vue-toastification';

export const useMemberStore = defineStore('member', () => {
  const allMembers = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const selectedMember = ref(null);
  const limit = ref(25);
  const isAll = ref(false);
  const details = ref();
  const inc = 15;
  const logging = ref(false);
  const hasMember = computed(() => allMembers.value.length > 0);

  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails']);

  const toast = useToast();

  const loadMembers = async () => {
    isLoading.value = true;
    error.value = null;
    const { data: userSession, error: userError } = await supabase.auth.getSession();
    if (userError) {
      toast.error('Impossible de trouver des informations utilisateurs');
      throw new Error('Impossible de trouver des informations utilisateurs');
    }

    const uuid = userSession.session.user.id;
    // console.log('UUID:', uuid);

    try {
      const { data } = await supabase
        .from('souls')
        .select()
        .eq('admin_id', uuid)
        .order('id', { ascending: true });
      const soulIds = data.map((s) => s.id);
      const { data: detailsData, error: detailsError } = await supabase
        .from('detail')
        .select('details, soul_id')
        .in('soul_id', soulIds)
        .order(`soul_id`, { ascending: true });
      if (detailsError) {
        throw detailsError;
      }
      allMembers.value = data;
      details.value = detailsData;
      const detailMap = Object.fromEntries(
        (detailsData || []).map((d) => [d.soul_id, d.details || {}]),
      );
      console.log('Details', detailMap);
      allMembers.value = allMembers.value.map((soul) => {
        return {
          ...soul,
          details: detailMap[soul.id] || {},
        };
      });
      // console.log('Loaded members:', allMembers.value);
    } catch (err) {
      error.value = err.message;
      console.error('Fetch error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const stats = computed(() => {
    const souls = allMembers.value.length;
    const saved = Math.round(
      (allMembers.value.filter((m) => m.salvationStatus).length / souls) * 100 || 0,
    );
    const notSaved = Math.round(
      ((souls - allMembers.value.filter((m) => m.salvationStatus).length) / souls) * 100 || 0,
    );
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

    const { data: detailData, error: detailError } = await supabase
      .from('detail')
      .select('details')
      .eq('soul_id', id)
      .single();
    if (detailError && detailError.code !== 'PGRST116') throw detailError; // ignore not found

    updated.details = detailData?.details || {};

    // update local list
    const index = allMembers.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      allMembers.value.splice(index, 1, updated);
    }

    // update selectedMember if it's the same one
    if (selectedMember.value?.id === id) {
      selectedMember.value = updated;
    }

    return updated;
  };
  const handleReporting = async (id, updates) => {
    // 1️⃣ Fetch current details from Supabase
    const { data, error } = await supabase
      .from('detail')
      .select('details')
      .eq('soul_id', id)
      .single();
    if (error && error.code !== 'PGRST116') throw error;

    // 2️⃣ Parse current details and add the new report
    const details = data?.details || {};
    const today = new Date().toLocaleDateString('fr-FR');
    if (details[today]) {
      // If entry exists for today, add new update with proper spacing
      details[today] = `${details[today]}\n${updates}`;
    } else {
      // If no entry exists for today, create new one
      details[today] = updates;
    }

    // 3️⃣ Update Supabase
    const { error: updateError } = await supabase
      .from('detail')
      .upsert({ soul_id: id, details })
      .select();
    if (updateError) {
      toast.error('Mise à jour échoué!');
      throw updateError;
    }

    // 4️⃣ Update local store so UI updates immediately
    const index = allMembers.value.findIndex((m) => m.id === id);
    if (index !== -1) {
      // Merge updated details into the member object
      allMembers.value[index] = {
        ...allMembers.value[index],
        details,
      };
    }

    // If the selected member is the same one, update it too
    if (selectedMember.value?.id === id) {
      selectedMember.value = {
        ...selectedMember.value,
        details,
      };
    }

    // 5️⃣ Optional: log for debugging
    console.log('Updated details:', details);
  };

  const members = computed(() => {
    return allMembers.value.slice(0, limit.value);
  });

  const showMore = () => {
    const remaining = allMembers.value.length - limit.value;
    if (remaining <= 0) {
      isAll.value = true;
      return;
    }
    limit.value += Math.min(inc, remaining);
  };

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
    handleReporting,
    logging,
    hasMember,
  };
});
