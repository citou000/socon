<!-- Accordion.vue -->
<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'

const openItem = ref(null)
provide('openItem', openItem)
</script>
