<script setup>
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';
import BaseButton from '@/components/BaseButton.vue';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const store = useMemberStore();

const { selectedMember } = storeToRefs(store);

const emit = defineEmits(['close', 'save']);

const name = ref('');
const soulHarvesters = ref('');
const neighborhood = ref('');
const salvationStatus = ref(false);

watch(
  selectedMember,
  (val) => {
    if (val) {
      name.value = val.name;
      neighborhood.value = val.neighborhood;
      soulHarvesters.value = val.soulHarvesters;
      salvationStatus.value = val.salvationStatus;
    }
  },
  { immediate: true },
);

const handleSave = async () => {
  const id = selectedMember.value.id;
  const updates = {
    name: name.value,
    neighborhood: neighborhood.value,
    soulHarvesters: soulHarvesters.value,
    salvationStatus: salvationStatus.value,
  };
  await store.updateMember(id, updates);
  emit('close');
};

const close = () => {
  emit('close');
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-700/50 backdrop-blur-sm flex justify-center items-center z-50">
    <div class="md:w-[40%] bg-white rounded-lg p-6 shadow-xl relative flex flex-col gap-4">
      <X class="size-6 top-4 right-4 cursor-pointer hover:text-red-500" @click="close" />

      <h2 class="text-3xl font-bold text-purple-900 mb-2">Modifier le membre</h2>

      <div class="flex flex-col gap-3">
        <label class="text-sm font-semibold text-gray-600">Nom</label>
        <input
          v-model="name"
          type="text"
          class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label class="text-sm font-semibold text-gray-600">Gagneur d'âmes</label>
        <input
          v-model="soulHarvesters"
          type="text"
          class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label class="text-sm font-semibold text-gray-600">Quartier</label>
        <input
          v-model="neighborhood"
          type="text"
          class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
        />

        <label class="text-sm font-semibold text-gray-600">Sauvé</label>
        <select
          v-model="salvationStatus"
          class="border border-purple-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option :value="true">Oui</option>
          <option :value="false">Non</option>
        </select>
      </div>

      <div class="flex justify-end gap-4 mt-6">
        <BaseButton variant="tertiary" @click="close">Annuler</BaseButton>
        <BaseButton variant="primary" @click="handleSave"> Enregistrer </BaseButton>
      </div>
    </div>
  </div>
</template>
