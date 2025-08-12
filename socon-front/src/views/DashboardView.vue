<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Sidebar from '@/components/SideBar.vue'
import ReportInput from '@/components/ReportInput.vue'
import MemberEdit from '@/components/MemberEdit.vue'
import { MoveLeft } from 'lucide-vue-next'
import { MoveRight } from 'lucide-vue-next'
import FilterWrapper from '@/components/FilterWrapper.vue'
import { useMemberStore } from '@/store/member'
import { storeToRefs } from 'pinia'

const store = useMemberStore()

const { members, stats, headers } = storeToRefs(store)

let intervalId = null

const currentIndex = ref(0)
const screenWidth = ref(window.innerWidth)

const handleResize = () => {
  screenWidth.value = window.innerWidth
}

const isSidebarOpen = ref(false)
const selectedMember = store.selectedMember
const isReporting = ref(false)
const isEditing = ref(false)

const handleColumnClick = () => {
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
      currentIndex.value > 0 ? currentIndex.value - 1 : Object.keys(stats.value).length - 1
  } else {
    currentIndex.value =
      currentIndex.value < Object.keys(stats.value).length - 1 ? currentIndex.value + 1 : 0
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
            <div v-for="(value, key) in stats" :key="key" class="w-full shrink-0 md:shrink p-4">
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

    <div class="px-4 md:p-8 max-w-7xl mx-auto w-full overflow-scroll">
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
