<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { EllipsisVertical } from 'lucide-vue-next';
defineProps({
  name: {
    type: String,
    required: true,
  },
});

const menu = ref(false);
const root = ref(null);

const handleClickOutside = (event) => {
  if (root.value && !root.value.contains(event.target)) {
    menu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div
    ref="root"
    class="bg-purple-100 rounded-xl border-purple-200 text-purple-900 flex text-balance cursor-pointer transition-colors duration-300 justify-between flex-1 items-center relative"
  >
    <div
      class="border-purple-200 bg-purple-100 hover:bg-purple-200 flex-1 h-full p-4 rounded-xl"
      @click="$emit('clicked')"
    >
      <h2 class="text-md font-semibold">{{ name }}</h2>
    </div>
    <div
      class="flex items-center p-0.5 transition-colors duration-300 rounded-md absolute my-auto right-0 z-10"
    >
      <EllipsisVertical
        class="w-8 h-8 text-purple-500 p-2 hover:bg-purple-200 rounded-md"
        @click.stop="menu = !menu"
      />
    </div>

    <div class="absolute -bottom-22 right-0 z-20 bg-white rounded-md shadow-xl font-semibold" v-if="menu">
      <ul class="flex flex-col gap-2 p-1">
        <li class="cursor-pointer hover:bg-purple-200 px-4 py-1 rounded-md text-gray-900">
          Modifier
        </li>
        <li class="cursor-pointer hover:bg-purple-100 px-4 py-1 rounded-md text-red-500">
          Supprimer
        </li>
      </ul>
    </div>
  </div>
</template>
