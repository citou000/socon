<template>
  <div class="transition-all duration-300 ease-in-out">
    <slot />
  </div>
</template>

<script setup>
import { provide, ref } from "vue";

const openItem = ref(null);
provide("openItem", openItem);
</script>
