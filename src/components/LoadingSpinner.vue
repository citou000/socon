<script setup>
defineProps({ size: { type: String, default: 'md' }, color: { type: String, default: 'purple' } });
</script>
<template>
  <div
    class="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
    :class="{
      'h-4 w-4': size === 'xs',
      'h-6 w-6': size === 'sm',
      'h-8 w-8': size === 'md',
      'h-12 w-12': size === 'lg',
      'text-purple-400': color === 'purple',
      'text-white': color === 'white',
    }"
    role="status"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>
