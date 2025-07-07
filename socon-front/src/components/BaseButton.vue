<script setup>
const props = defineProps({
  bg: {
    type: String,
    default: 'bg-gray-300',
  },
  hoverBg: {
    type: String,
    default: 'bg-gray-400',
  },
  color: {
    type: String,
    default: 'text-gray-700',
  },
})
</script>

<template>
  <button
    :class="[
      'px-6',
      'py-2',
      'rounded-md',
      `${props.bg}`,
      `hover:${props.hoverBg}`,
      `${props.color}`,
      'transition-colors',
      'duration-300',
      'flex',
      'items-center',
      'gap-2',
      'font-bold',
      'cursor-pointer',
    ]"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
