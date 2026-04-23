import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from 'vue-toastification';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuth } from '@/store/authStore';

export const useMemberStore = defineStore('member', () => {
  const route = useRoute();
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
  const teams = ref([]);
  const auth = useAuth();
  const { user } = storeToRefs(auth);

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
  const headers = ref(['Nom', 'Quartier', 'Moissonneurs', 'Sauvé', 'Détails']);
  const toast = useToast();

  const loadMembers = async () => {
    isLoading.value = true;
    const teamId = route.params.id;
    error.value = null;

    try {
      const { data } = await supabase.from('souls').select().eq('team_id', teamId);
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
      allMembers.value = allMembers.value.map((soul) => {
        return {
          ...soul,
          details: detailMap[soul.id] || {},
        };
      });
    } catch (err) {
      error.value = err.message;
      console.error('Fetch error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  async function loadTeams() {
    console.log(user.value.id)
    const { data, error } = await supabase.from('members').select(`
      role,
      teams(
        id,
        name
      )
    `).eq('user_id', user.value.id);
    console.log(data);
    if (error) {
      toast.error('Impossible de trouver des informations sur les équipes');
    }
    teams.value = data.map((team) => {
      return team.teams;
    })
    console.log(teams.value)
    //const { data: teamsData, error: teamsError } = await supabase.from('teams').select().eq('id', team[0].team_id);
    //if (teamsError) {
    //  toast.error('Impossible de trouver des informations sur les équipes');
    //  throw new Error('Impossible de trouver des informations sur les équipes');
    //}
    // teams.value = teamsData;
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
    /*
     The id is real because it's used to fetch the currentDetails, and the retrieve was done successfully
     * */
    const { data, error } = await supabase.from('details').select('details').eq('id', id).single();
    if (error && error.code !== 'PGRST116') throw error;
    const currentDetails = data?.details || [];

    const today = new Date().toLocaleDateString('fr-FR');
    const update = {
      date: today,
      report: updates,
    };
    currentDetails.push(update);
    console.log("Current details:", currentDetails);

    /*
    The currentDetails are displayed correctly
    */

    const { error: updateError } = await supabase
      .from('details')
      .upsert({ id: id, details: currentDetails })
      .select();

    // Now we choose the table with the .from and the table choosen is the details, and we upsert an
    // Object and the .select is for what ?
    // And the id we put in the upserted object is the id sent, and used in the retrieving of the
    // details so it can't be false
    if (updateError) {
      toast.error('Mise à jour échoué!');
      throw updateError;
    }

    await loadMembers();

    if (selectedMember.value?.id === id) {
      selectedMember.value = {
        ...selectedMember.value,
        details: currentDetails,
      };
    }
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
    loadTeams,
    teams,
  };
});
