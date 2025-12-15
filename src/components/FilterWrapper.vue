<script setup>
import { ref } from 'vue';
// import { Search, ListFilter } from 'lucide-vue-next'
// import BaseButton from '@/components/BaseButton.vue'

const tabs = ref('all');

const tabOptions = [
  { label: 'Tous', key: 'all' },
  { label: 'Par mentor', key: 'mentor' },
  { label: 'Par salut', key: 'salvation' },
];

const emit = defineEmits(['tab-clicked']);

function changeTab(key) {
  tabs.value = key;
  emit('tab-clicked', key);
}
</script>

<template>
  <div class="flex justify-between px-12 max-w-7xl mx-auto w-full">
    <!-- Tab Buttons -->
    <div class="flex items-center gap-4">
      <div
        v-for="tab in tabOptions"
        :key="tab.key"
        :class="[
          'text-purple-900',
          'font-semibold',
          'cursor-pointer',
          'px-4',
          'py-2',
          tabs === tab.key ? 'border-b-2 border-purple-800' : '',
        ]"
        @click="changeTab(tab.key)"
      >
        {{ tab.label }}
      </div>
    </div>

    <!-- Action Buttons -->
    <!-- <div class="flex gap-2">
      <BaseButton variant="tertiary" :squared="true">
        <ListFilter />
      </BaseButton>
      <BaseButton variant="tertiary" :squared="true">
        <Search />
      </BaseButton>
    </div> -->
  </div>
</template>
