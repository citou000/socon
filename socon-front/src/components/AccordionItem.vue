<template>
  <div class="border-b-2 border-gray-300">
    <!-- Summary-like header -->
    <div
      @click="toggle"
      class="cursor-pointer py-3 font-bold text-gray-800 flex justify-between items-center"
    >
      <span>{{ props.title }}</span>
      <span class="text-gray-500 text-2sm">{{ isOpen ? '-' : '+' }}</span>
    </div>

    <!-- Collapsible content -->

    <transition name="accordion">
      <div v-show="isOpen" class="pl-2 pb-3 text-gray-700 text-sm">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
// src/components/AccordionItem.vue
import { inject, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Shared state from Accordion.vue
const openItem = inject('openItem', null);

const isOpen = computed(() => openItem?.value === props.title);

function toggle() {
  if (openItem) {
    openItem.value = isOpen.value ? null : props.title;
  }
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.2s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
.accordion-enter-to,
.accordion-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
