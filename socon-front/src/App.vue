<script setup>
import { ref } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Sidebar from '@/components/SideBar.vue'
import ReportInput from '@/components/ReportInput.vue'
import MemberEdit from '@/components/MemberEdit.vue'

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
      'Semaine 1': 'A commencé le Catéchisme 101, a assisté à 2 sessions.',
      'Semaine 2': 'A terminé le chapitre 1, actif dans la discussion de groupe.',
      'Semaine 3': 'A manqué la session, à suivre avec le mentor.',
    },
  },
  {
    name: 'Jane Smith',
    formation: 'Étude biblique',
    mentor: 'Diacre Bob',
    baptismStatus: true,
    details: {
      'Semaine 1': "A rejoint l'Étude biblique, a lu Genèse 1-5.",
      'Semaine 2': 'A participé à la discussion, a posé des questions.',
      'Semaine 3': 'Se prépare pour la prochaine session, révision avec le mentor.',
    },
  },
  {
    name: 'Mary Johnson',
    formation: 'Cours de discipulat',
    mentor: 'Sœur Clara',
    baptismStatus: true,
    details: {
      'Semaine 1': "A commencé le Cours de discipulat, a assisté à l'introduction.",
      'Semaine 2': 'A dirigé une petite session de groupe.',
      'Semaine 3': 'A planifié la prochaine réunion avec le mentor.',
    },
  },
  {
    name: 'Peter Brown',
    formation: 'Classe des nouveaux croyants',
    mentor: 'Pasteur Alice',
    baptismStatus: true,
    details: {
      'Semaine 1': 'A assisté au premier cours, a été initié aux bases.',
      'Semaine 2': 'A posé des questions sur le processus de baptême.',
      'Semaine 3': 'A manqué le cours, le mentor doit faire un suivi.',
    },
  },
  {
    name: 'Sophie Dubois',
    formation: 'Groupe de louange',
    mentor: 'Frère Marc',
    baptismStatus: false,
    details: {
      'Semaine 1': 'A rejoint le groupe de louange, a participé à la première répétition.',
      'Semaine 2': "A appris de nouveaux chants, s'est bien intégrée.",
      'Semaine 3': "A aidé à organiser le matériel, montre de l'enthousiasme.",
      'Semaine 4': 'A chanté en solo pour la première fois, très encourageant.',
    },
  },
  {
    name: 'Michel Laurent',
    formation: 'Service communautaire',
    mentor: 'Sœur Anne',
    baptismStatus: true,
    details: {
      'Semaine 1': 'A participé à une distribution de repas aux sans-abris.',
      'Semaine 2': 'A aidé à nettoyer le centre communautaire.',
      'Semaine 3': 'A organisé une collecte de vêtements, très engagé.',
      'Semaine 4': "A témoigné de son expérience, a inspiré d'autres.",
    },
  },
  {
    name: 'Chloé Martin',
    formation: 'École du dimanche',
    mentor: 'Diacre Paul',
    baptismStatus: false,
    details: {
      'Semaine 1': "A commencé l'École du dimanche, a interagi avec les enfants.",
      'Semaine 2': "A préparé une leçon sur l'histoire de David.",
      'Semaine 3': "A géré un groupe d'enfants difficiles avec patience.",
      'Semaine 4': 'A reçu des retours positifs des parents.',
    },
  },
  {
    name: 'Thomas Bernard',
    formation: 'Cours de théologie',
    mentor: 'Professeur Jean',
    baptismStatus: true,
    details: {
      'Semaine 1': 'A débuté le cours de théologie, a lu les textes fondamentaux.',
      'Semaine 2': 'A participé activement aux débats, a posé des questions profondes.',
      'Semaine 3': 'A soumis un essai sur la doctrine de la grâce.',
      'Semaine 4': "A obtenu d'excellents résultats à l'examen de mi-parcours.",
    },
  },
])

const headers = ref(['Noms', 'Formations', 'Mentor', 'Baptisés', 'Details'])

// State for sidebar
const isSidebarOpen = ref(false)
const selectedMember = ref(null)
const isReporting = ref(false)
const isEditing = ref(false)
// Handle column click from DataTable
const handleColumnClick = ({ member }) => {
  selectedMember.value = member
  isSidebarOpen.value = true
}
const handleReporting = () => {
  isReporting.value = true
}

const handleSubmission = (report) => {
  console.log('[SUBMIT]', report)

  if (!report || !selectedMember.value) {
    alert('Veuillez entrer un rapport valide.')
    return
  }

  const week = `Semaine ${Object.keys(selectedMember.value.details).length + 1}`
  selectedMember.value.details[week] = report
  isReporting.value = false
}

const handleMemberEditing = (name) => {
  console.log('Editing member:', name)
  // Logic for editing the member can be added here
  isEditing.value = true
}

const handleMemberSaving = (updatedMember) => {
  selectedMember.value = updatedMember
  isEditing.value = false
  console.log('Member updated:', updatedMember)
  members.value = members.value.map((member) =>
    member.name === updatedMember.name ? updatedMember : member,
  )
  console.table(members.value)
}
</script>

<!-- <template>
  <main class="w-full h-screen bg-purple-50">
    <div class="bg-purple-200 text-purple-900 w-full py-7">
      <div class="md:w-full md:grid-cols-3 md:mx-auto md:items-center grid grid-cols-1 h-full px-8 bg-amber-300 gap-4">
        <div v-for="(value, key) in dashboardOptions" :key="key"
          class="md:w-fit w-full bg-amber-100 gap-3 flex flex-col items-start justify-around cursor-pointer p-8 hover:bg-purple-200 transition-all duration-300 ease-in-out my-2">
          <span class="self-start text-xl font-mono font-semibold">{{ key }}</span>
          <span class="text-8xl font-semibold">{{ value }}<span v-if="key !== 'Âmes'">%</span></span>
        </div>
      </div>
    </div>

    <div class="p-4 max-w-7xl mx-auto mt-8 w-full">
      <DataTable :data="members" :headers="headers" @column-click="handleColumnClick" />
    </div>

    <Sidebar v-if="isSidebarOpen" :member="selectedMember" @close="isSidebarOpen = false" @addReport="handleReporting"
      @editMember="handleMemberEditing" />
    <ReportInput v-if="isReporting" @close="isReporting = false" @reportSubmission="handleSubmission" />
    <MemberEdit v-if="isEditing" :member="selectedMember" @close="isEditing = false" @save="handleMemberSaving" />
  </main>
</template> -->
<template>
  <main class="min-h-screen bg-purple-50">
    <div class="bg-purple-200 text-purple-900 w-full py-7">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-amber-300 py-4">
          <div v-for="(value, key) in dashboardOptions" :key="key"
            class="w-full bg-amber-100 flex flex-col items-start justify-around cursor-pointer p-6 sm:p-8 hover:bg-purple-200 transition-all duration-300 ease-in-out">
            <span class="self-start text-lg sm:text-xl font-mono font-semibold text-purple-800">{{ key }}</span>
            <span class="text-6xl sm:text-7xl lg:text-8xl font-semibold text-purple-900 mt-2">{{ value }}<span v-if="key !== 'Âmes'">%</span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto mt-8 w-full">
      <DataTable :data="members" :headers="headers" @column-click="handleColumnClick" />
    </div>

    <Sidebar v-if="isSidebarOpen" :member="selectedMember" @close="isSidebarOpen = false" @addReport="handleReporting"
      @editMember="handleMemberEditing" />
    <ReportInput v-if="isReporting" @close="isReporting = false" @reportSubmission="handleSubmission" />
    <MemberEdit v-if="isEditing" :member="selectedMember" @close="isEditing = false" @save="handleMemberSaving" />
  </main>
</template>
