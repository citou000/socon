<script setup>
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';

const store = useMemberStore();
const { members, headers } = storeToRefs(store);

const emit = defineEmits(['column-click']);

const selectMemberAndEmit = (i) => {
  store.selectMember(i);
  emit('column-click');
};
</script>

<template>
  <div class="relative rounded-t-lg overflow-x-auto w-full">
    <table class="w-full text-sm border-b-2 border-gray-300">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :class="[
              'p-2 text-left font-semibold cursor-default text-xl',
              ['Détails', 'Quartier'].includes(header) ? 'hidden md:table-cell' : '',
            ]"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="i in members"
          :key="i.id"
          class="hover:bg-gray-100 cursor-pointer border-t-2 border-gray-300"
          @click="selectMemberAndEmit(i)"
        >
          <!-- Nom -->
          <td class="p-3 font-semibold text-md">
            {{ i.name }}
          </td>

          <!-- Groupe -->
          <td class="p-3 text-gray-600 hidden md:table-cell">
            {{ i.neighborhood }}
          </td>

          <!-- Moissonneurs -->
          <td class="p-3">
            {{ i.soulHarvesters }}
          </td>

          <!-- Statut Salut -->
          <td class="p-3 text-center">
            <span
              :class="[
                'py-1 px-2 rounded-sm',
                i.salvationStatus ? 'text-green-500 bg-green-400/20' : 'text-red-500 bg-red-400/20',
              ]"
            >
              {{ i.salvationStatus ? 'Oui' : 'Non' }}
            </span>
          </td>

          <!-- Dernière note disponible -->
          <td class="p-3 hidden md:table-cell">
            {{
              // i.details && Object.values(i.details).length
              //   ? Object.values(i.details).at(0)
              //   : 'Aucun rapport disponible'
              i.details.length ? i.details[i.details.length - 1].report : 'Aucun rapport disponible'
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
