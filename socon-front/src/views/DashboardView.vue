<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Sidebar from '@/components/SideBar.vue'
import ReportInput from '@/components/ReportInput.vue'
import MemberEdit from '@/components/MemberEdit.vue'
import { MoveLeft } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FilterWrapper from '@/components/FilterWrapper.vue'

let intervalId = null

const currentIndex = ref(0)
const screenWidth = ref(window.innerWidth)

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

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

const stats = (list) => {
  let saved = 0
  let mentored = 0

  list.forEach((soul) => {
    if (soul.baptismStatus) saved++
    if (soul.details && Object.keys(soul.details).length > 0) mentored++
  })

  return {
    'Ayant fait la prière du salut': Math.round((saved / list.length) * 100),
    Âmes: list.length,
    Suivi: Math.round((mentored / list.length) * 100),
  }
}

const dashboardOptions = computed(() => stats(members.value))
const headers = ref(['Noms', 'Formations', 'Mentor', 'Prière du salut', 'Details'])

const isSidebarOpen = ref(false)
const selectedMember = ref(null)
const isReporting = ref(false)
const isEditing = ref(false)

const handleColumnClick = ({ member }) => {
  selectedMember.value = member
  isSidebarOpen.value = true
}

const handleReporting = () => {
  isReporting.value = true
}

const handleSubmission = (report) => {
  if (!report || !selectedMember.value) {
    alert('Veuillez entrer un rapport valide.')
    return
  }
  const week = `Semaine ${Object.keys(selectedMember.value.details).length + 1}`
  selectedMember.value.details[week] = report
  isReporting.value = false
}

const handleMemberEditing = () => {
  isEditing.value = true
}

const handleMemberSaving = (updatedMember) => {
  selectedMember.value = updatedMember
  isEditing.value = false
  members.value = members.value.map((member) =>
    member.name === updatedMember.name ? updatedMember : member,
  )
}

const move = (direction) => {
  if (direction === 'left') {
    currentIndex.value =
      currentIndex.value > 0
        ? currentIndex.value - 1
        : Object.keys(dashboardOptions.value).length - 1
  } else {
    currentIndex.value =
      currentIndex.value < Object.keys(dashboardOptions.value).length - 1
        ? currentIndex.value + 1
        : 0
  }
}

function startAutoSlide() {
  clearInterval(intervalId)
  intervalId = setInterval(() => move('right'), 5000)
}

function stopAutoSlide() {
  currentIndex.value = 0
  clearInterval(intervalId)
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  if (screenWidth.value < 768) {
    startAutoSlide()
  }
})

onBeforeUnmount(() => {
  stopAutoSlide()
  window.removeEventListener('resize', handleResize)
})

watch(screenWidth, (newWidth, oldWidth) => {
  if (newWidth < 768 && oldWidth >= 768) {
    startAutoSlide()
  } else {
    stopAutoSlide()
  }
})

const handleTab = (key) => {
  // Handle tab click logic here
  console.log(`Tab clicked: ${key}`)
}
</script>

<template>
  <main class="min-h-screen bg-purple-50 flex flex-col gap-4">
    <div class="bg-purple-200 text-purple-900 w-full py-7">
      <div class="max-w-7xl mx-auto relative flex flex-col items-center">
        <div class="overflow-hidden w-full">
          <div
            class="flex transition-transform duration-300 ease-in-out"
            :style="{
              transform: `translateX(-${currentIndex * 100}%)`,
            }"
          >
            <div
              v-for="(value, key) in dashboardOptions"
              :key="key"
              class="w-full shrink-0 md:shrink p-4"
            >
              <div
                class="bg-purple-100 flex flex-col items-start justify-around cursor-pointer p-6 sm:p-8 transition-all duration-300 ease-in-out rounded-2xl h-full"
              >
                <span class="self-start text-lg sm:text-xl font-mono font-semibold text-purple-800">
                  {{ key }}
                </span>
                <span class="text-6xl sm:text-7xl lg:text-8xl font-semibold text-purple-900 mt-2">
                  {{ value }}<span v-if="key !== 'Âmes'">%</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="absolute inset-y-1/2 -translate-y-1/2 w-full px-4 flex justify-between items-center md:hidden"
        >
          <button
            class="border border-purple-400 p-1 rounded-full bg-white/50 backdrop-blur hover:bg-white cursor-pointer"
            @click="move('left')"
          >
            <MoveLeft />
          </button>
          <button
            class="border border-purple-400 p-1 rounded-full bg-white/50 backdrop-blur hover:bg-white cursor-pointer"
            @click="move('right')"
          >
            <MoveRight />
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center w-full">
      <FilterWrapper @tab-clicked="(key) => handleTab(key)" />
    </div>

    <div class="px-4 md:p-8 max-w-7xl mx-auto mt-8 w-full overflow-scroll">
      <DataTable :data="members" :headers="headers" @column-click="handleColumnClick" />
    </div>

    <Sidebar
      v-if="isSidebarOpen"
      :member="selectedMember"
      @close="isSidebarOpen = false"
      @addReport="handleReporting"
      @editMember="handleMemberEditing"
    />
    <ReportInput
      v-if="isReporting"
      @close="isReporting = false"
      @reportSubmission="handleSubmission"
    />
    <MemberEdit
      v-if="isEditing"
      :member="selectedMember"
      @close="isEditing = false"
      @save="handleMemberSaving"
    />
  </main>
</template>
