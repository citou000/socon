<script setup>
const props = defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100',
  },
  hoverBg: {
    type: String,
    default: 'hover:bg-gray-200',
  },
  border: {
    type: String,
    default: 'border border-gray-300',
  },
  rounded: {
    type: String,
    default: 'rounded-md',
  },
  color: {
    type: String,
    default: 'text-gray-700',
  },
  type: {
    required: true,
    type: String,
    // default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'tertiary'].includes(value)
    },
  },
})
</script>

<template>
  <button
    :class="[
      'px-4',
      'py-1',
      'rounded-md',
      props.bg,
      props.hoverBg,
      props.color,
      props.border,
      props.rounded,
      'hover:bg-opacity-80',
      'focus:outline-none',
      'transition-colors',
      'duration-300',
      'flex',
      'items-center',
      'justify-center',
      'gap-2',
      'font-bold',
      'cursor-pointer',
      'w-full',
    ]"
    @click="$emit('event')"
  >
    <slot name="icon"></slot>
    <slot></slot>
  </button>
</template>
