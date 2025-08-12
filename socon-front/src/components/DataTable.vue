<script setup>
import { useMemberStore } from '@/store/member'
import { storeToRefs } from 'pinia'

const store = useMemberStore()
const { members, headers } = storeToRefs(store)

const emit = defineEmits(['column-click'])

const selectMemberAndEmit = (i) => {
  store.selectMember(i)
  emit('column-click')
}
</script>

<template>
  <div class="relative bg-purple-50 px-8 pt-4 rounded-t-lg">
    <table class="w-full text-sm px-2">
      <thead class="rounded-t-lg px-2">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="p-2 text-left font-semibold cursor-default text-xl border-b-2 border-gray-300"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="i in members"
          :key="i.id"
          class="hover:bg-gray-100 cursor-pointer border-b-2 border-gray-300"
          @click="selectMemberAndEmit(i)"
        >
          <!-- Nom -->
          <td class="p-3 font-semibold text-md">
            {{ i.name }}
          </td>

          <!-- Groupe -->
          <td class="p-3 text-gray-600">
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
                'py-1',
                'px-2',
                'rounded-sm',
                i.salvationStatus ? 'text-green-500 bg-green-400/20' : 'text-red-500 bg-red-400/20',
              ]"
            >
              {{ i.salvationStatus ? 'Oui' : 'Non' }}
            </span>
          </td>

          <!-- Dernière note disponible -->
          <td class="p-3">
            <div>
              {{
                Object.values(i.details).length
                  ? Object.values(i.details).at(-1)
                  : 'Aucun rapport disponible'
              }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
