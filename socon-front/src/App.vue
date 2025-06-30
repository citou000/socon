<template>
  <main class="w-full h-screen bg-purple-50">
    <div class="h-[40%] bg-purple-200 text-purple-900 flex">
      <div class="w-full flex items-center justify-around h-full px-8">
        <div v-for="(value, key) in dashboardOptions" :key="key"
          class="flex flex-col items-start justify-around w-fit cursor-pointer p-8 hover:bg-purple-200 transition-all duration-300 ease-in-out my-2 rounded-lg">
          <span class="self-start text-xl font-mono font-semibold">{{ key }}</span>
          <span class="text-8xl font-semibold">{{ value }}<span v-if="key !== 'Âmes'">%</span></span>
        </div>
      </div>
    </div>

    <div class="p-4 max-w-7xl mx-auto mt-8 w-full">
      <DataTable :data="members" :headers="headers" @column-click="handleColumnClick" />
    </div>

    <Sidebar v-if="isSidebarOpen" :member="selectedMember" :column-index="selectedColumnIndex"
      @close="isSidebarOpen = false" />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import DataTable from '@/components/DataTable.vue';
import Sidebar from '@/components/SideBar.vue';

// Dashboard statistics
const dashboardOptions = ref({
  Baptisés: 50,
  Âmes: 100,
  Suivis: 50,
});

// Member data
const members = ref([
  {
    name: 'John Doe',
    formation: 'Catéchisme 101',
    mentor: 'Pasteur Alice',
    baptismStatus: true,
    details: 'A terminé Catéchisme 101 en 2024, actif dans le groupe de jeunes.',
  },
  {
    name: 'Jane Smith',
    formation: 'Étude biblique',
    mentor: 'Diacre Bob',
    baptismStatus: true,
    details: 'A rejoint l’étude biblique en 2025, se prépare au baptême.',
  },
  {
    name: 'Mary Johnson',
    formation: 'Cours de discipulat',
    mentor: 'Sœur Clara',
    baptismStatus: true,
    details: 'Dirige un petit groupe, baptisé en 2023.',
  },
  {
    name: 'Peter Brown',
    formation: 'Classe des nouveaux croyants',
    mentor: 'Pasteur Alice',
    baptismStatus: false,
    details: 'Nouveau membre, a commencé à assister en 2025.',
  },
]);

const headers = ref(['Noms', 'Formations', 'Mentor', 'Baptisés', 'Details']);

// State for sidebar
const isSidebarOpen = ref(false);
const selectedMember = ref(null);
const selectedColumnIndex = ref(null);

// Handle column click from DataTable
const handleColumnClick = ({ member, columnIndex }) => {
  selectedMember.value = member;
  selectedColumnIndex.value = columnIndex;
  isSidebarOpen.value = true;
};

// Optional: Fetch from Deno backend
// import { onMounted } from 'vue';
// onMounted(async () => {
//   const response = await fetch('/api/members');
//   members.value = await response.json();
// });
</script>
