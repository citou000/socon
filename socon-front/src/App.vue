<script setup>
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Sidebar from '@/components/SideBar.vue'
import ReportInput from '@/components/ReportInput.vue'

// Dashboard statistics
const dashboardOptions = ref({
  Baptisés: 50,
  Âmes: 100,
  Suivis: 50,
})

// Member data with weekly details
const members = ref([
  {
    name: 'John Doe',
    formation: 'Catéchisme 101',
    mentor: 'Pasteur Alice',
    baptismStatus: true,
    details: {
      '1st week': 'Started Catéchisme 101, attended 2 sessions.',
      '2nd week': 'Completed chapter 1, active in group discussion.',
      '3rd week': 'Missed session, to follow up with mentor.',
    },
  },
  {
    name: 'Jane Smith',
    formation: 'Étude biblique',
    mentor: 'Diacre Bob',
    baptismStatus: true,
    details: {
      '1st week': 'Joined Étude biblique, read Genesis 1-5.',
      '2nd week': 'Participated in discussion, asked questions.',
      '3rd week': 'Preparing for next session, mentor review.',
    },
  },
  {
    name: 'Mary Johnson',
    formation: 'Cours de discipulat',
    mentor: 'Sœur Clara',
    baptismStatus: true,
    details: {
      '1st week': 'Began Cours de discipulat, attended intro.',
      '2nd week': 'Led a small group session.',
      '3rd week': 'Planned next meeting with mentor.',
    },
  },
  {
    name: 'Peter Brown',
    formation: 'Classe des nouveaux croyants',
    mentor: 'Pasteur Alice',
    baptismStatus: true,
    details: {
      '1st week': 'Attended first class, introduced to basics.',
      '2nd week': 'Asked about baptism process.',
      '3rd week': 'Missed class, mentor to follow up.',
    },
  },
])

const headers = ref(['Noms', 'Formations', 'Mentor', 'Baptisés', 'Details'])

// State for sidebar
const isSidebarOpen = ref(false)
const selectedMember = ref(null)
const isReporting = ref(true)
// Handle column click from DataTable
const handleColumnClick = ({ member }) => {
  selectedMember.value = member
  isSidebarOpen.value = true
}
const handleReporting = () => {
  isSidebarOpen.value = false
  isReporting.value = true
}
</script>

<template>
  <main class="w-full h-screen bg-purple-50">
    <div class="h-[40%] bg-purple-200 text-purple-900 flex w-full">
      <div class="w-full flex items-center justify-around h-full px-8">
        <div
          v-for="(value, key) in dashboardOptions"
          :key="key"
          class="flex flex-col items-start justify-around w-fit cursor-pointer p-8 hover:bg-purple-200 transition-all duration-300 ease-in-out my-2 rounded-lg"
        >
          <span class="self-start text-xl font-mono font-semibold">{{ key }}</span>
          <span class="text-8xl font-semibold"
            >{{ value }}<span v-if="key !== 'Âmes'">%</span></span
          >
        </div>
      </div>
    </div>

    <div class="p-4 max-w-7xl mx-auto mt-8 w-full">
      <DataTable :data="members" :headers="headers" @column-click="handleColumnClick" />
    </div>

    <Sidebar
      v-if="isSidebarOpen"
      :member="selectedMember"
      :column-index="selectedColumnIndex"
      @close="isSidebarOpen = false"
      @add-report="handleReporting"
    />
    <ReportInput v-if="isReporting" @close="isReporting = false" />
  </main>
</template>
