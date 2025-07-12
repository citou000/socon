<script setup>
import { Search } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
// import BaseButton from '@/components/BaseButton.vue'

const advancedFilter = ref(false)

const more = () => {
  advancedFilter.value = true
}
</script>

<template>
  <div class="mx-9 flex gap-4 items-center">
    <div class="flex w-full gap-2">
      <input
        type="text"
        name="search"
        id="search"
        class="rounded-sm outline-0 border border-purple-400 pl-4 w-full"
      />
      <span class="bg-purple-400 rounded-sm p-2 text-white hover:bg-purple-600 cursor-pointer"
        ><Search
      /></span>
    </div>
    <RouterLink class="hover:underline hover:text-purple-700" @click="more">Plus</RouterLink>
  </div>
</template>
