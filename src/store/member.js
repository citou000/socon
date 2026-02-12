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
  const details = ref();
  const isAll = ref(false);
  const inc = 15;
  const logging = ref(false);
  const hasMember = computed(() => {
    return allMembers.value.length > 0;
  });
  
  const monthNames = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  const teams = ref([]);

  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails']);
  const toast = useToast();
  const uuid = ref(null);

  const init = async () => {
    const { data: userSession, error: userError } = await supabase.auth.getSession();
    uuid.value = userSession.session.user.id;
  }

  const loadMembers = async () => {
    isLoading.value = true;
    const teamId = localStorage.getItem('currentTeamId');
    error.value = null;
    console.log(uuid.value);
    try {
      const { data } = await supabase
        .from('souls')
        .select()
        .eq('team_id', teamId);
      const soulIds = data.map((s) => s.id);
      const { data: detailsData, error: detailsError } = await supabase
        .from('details')
        .select('details, id')
        .in('id', soulIds)
        .order(`id`, { ascending: true });
      if (detailsError) {
        throw detailsError;
      }
      allMembers.value = data;
      details.value = detailsData;
      allMembers.value = allMembers.value.map((soul) => {
        return {
          ...soul,
          details: details.value.find((d) => d.id === soul.id)?.details || {},
        };
      });
      const detailMap = Object.fromEntries((detailsData || []).map((d) => [d.id, d.details || {}]));
      console.log('Details', detailMap);
      allMembers.value = allMembers.value.map((soul) => {
        return {
          ...soul,
          details: detailMap[soul.id] || {},
        };
      });
      console.log('Loaded members:', allMembers.value);
      console.log('Details', details.value);
      console.log('All members', allMembers.value);
    } catch (err) {
      error.value = err.message;
      console.error('Fetch error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const loadTeams = async () => {
    try {
      const { data: teamsData, error: teamsError } = await supabase.from('teams').select().eq('admin_id', uuid.value);
      teams.value = teamsData || [];
    } catch (err) {
      console.error('loadTeams: unexpected error', err);
      toast.error('Impossible de trouver des informations sur les équipes');
      // teams.value = [];
    }
  }
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
      .from('details')
      .select('details')
      .eq('id', id)
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

  const addMember = (update) => {
    const { data, error } = supabase.from('souls').insert(update);
    if (error) {
      throw error;
    }
    const { detailData, detailError } = supabase
      .from('details')
      .insert({ id: data[0].id, details: [{}] });
  };

  const handleReporting = async (id, updates) => {
    const { data, error } = await supabase.from('details').select('details').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error;
    const currentDetails = data?.details || [];
    const today = new Date().toLocaleDateString('fr-FR');
    console.log('Today is:', today);
    //if (currentDetails[today]) {
    console.log('Already reporting today\n', currentDetails.value);
    console.log('Updates\n', updates);
    const update = {
      date: today,
      report: updates,
    };
    currentDetails.push(update);
    console.log(currentDetails);

    const { error: updateError } = await supabase
      .from('details')
      .upsert({ id: id, details: currentDetails })
      .select();
    if (updateError) {
      toast.error('Mise à jour échoué!');
      throw updateError;
    }

    // 4️⃣ Update local store so UI updates immediately
    loadMembers(); // re-fetch to get the latest data, or you could optimistically update the specific member in allMembers

    // If the selected member is the same one, update it too
    if (selectedMember.value?.id === id) {
      selectedMember.value = {
        ...selectedMember.value,
        details,
      };
    }

    // 5️⃣ Optional: log for debugging
    console.log('Updated details:', details.value);
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
    monthNames,
    addMember,
    teams,
    init,
    loadTeams,
  };
});
