<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import DataTable from '@/components/DataTable.vue';
import Sidebar from '@/components/SideBar.vue';
import ReportInput from '@/components/ReportInput.vue';
import MemberEdit from '@/components/MemberEdit.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { MoveLeft, MoveRight, ChevronDown } from 'lucide-vue-next';
import { useMemberStore } from '@/store/member';
import { storeToRefs } from 'pinia';
import BaseButton from '@/components/BaseButton.vue';
import NavBar from '@/components/NavBar.vue';
import addMember from '@/components/AddMember.vue';

const store = useMemberStore();

const { stats, keys, isAll, limit, isLoading, hasMember } = storeToRefs(store);

let intervalId = null;

const addMemberRef = ref(null);
const currentIndex = ref(0);
const screenWidth = ref(window.innerWidth);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

const isSidebarOpen = ref(false);
const selectedMember = store.selectedMember;
const isReporting = ref(false);
const isEditing = ref(false);
const isAdding = ref(false);

const handleColumnClick = () => {
  isSidebarOpen.value = true;
};

const handleReporting = () => {
  isReporting.value = true;
};

const handleSubmission = () => {
  isReporting.value = false;
};

const handleMemberEditing = () => {
  isEditing.value = true;
};

const move = (direction) => {
  if (direction === 'left') {
    currentIndex.value =
      currentIndex.value > 0 ? currentIndex.value - 1 : Object.keys(stats.value).length - 1;
  } else {
    currentIndex.value =
      currentIndex.value < Object.keys(stats.value).length - 1 ? currentIndex.value + 1 : 0;
  }
};

function startAutoSlide() {
  clearInterval(intervalId);
  intervalId = setInterval(() => move('right'), 5000);
}

function stopAutoSlide() {
  currentIndex.value = 0;
  clearInterval(intervalId);
}

const openAddMember = async () => {
  isAdding.value = true;
  await nextTick();
  addMemberRef.value?.setFocus();
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  if (screenWidth.value < 768) {
    startAutoSlide();
  }
  store.loadMembers();
});

onBeforeUnmount(() => {
  stopAutoSlide();
  window.removeEventListener('resize', handleResize);
});

watch(screenWidth, (newWidth, oldWidth) => {
  if (newWidth < 768 && oldWidth >= 768) {
    startAutoSlide();
  } else {
    stopAutoSlide();
  }
});
</script>
<template>
  <NavBar @addSouls="openAddMember" />
  <main class="min-h-screen flex flex-col gap-4">
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
                  {{ keys[key] }}
                </span>
                <span class="text-6xl sm:text-7xl lg:text-8xl font-semibold text-purple-900 mt-2">
                  {{ value }}<span v-if="key !== 'souls'">%</span>
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
    <div v-if="isLoading" class="flex justify-center items-center p-8">
      <LoadingSpinner size="lg" />
    </div>
    <div
      v-else
      class="px-4 md:p-8 max-w-7xl mx-auto w-full overflow-scroll flex flex-col items-center"
    >
      <DataTable @column-click="handleColumnClick" />
      <BaseButton
        v-if="!isAll & hasMember"
        variant="tertiary"
        :width="false"
        :rounded="true"
        :margin="true"
        class="text-purple-800"
        @click="store.showMore(limit)"
      >
        <ChevronDown />
        Plus
      </BaseButton>
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
    <MemberEdit v-if="isEditing" @close="isEditing = false" />
    <addMember v-if="isAdding" @close="isAdding = false" ref="addMemberRef" />
  </main>
</template>
