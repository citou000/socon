<script setup>
const props = defineProps({
  variant: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
  squared: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Boolean,
    default: true,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  margin: {
    type: Boolean,
    default: false,
  },
});

const classes = {
  primary: {
    bg: 'bg-purple-600',
    hover: 'hover:bg-purple-700',
    text: 'text-white',
  },
  secondary: {
    bg: 'bg-gray-200',
    hover: 'hover:bg-gray-300',
    text: 'text-gray-800',
    border: 'border border-gray-300',
  },
  no_border: {
    bg: 'bg-transparent',
    hover: 'hover:bg-gray-300',
    text: 'text-gray-800',
    border: '',
  },
};
</script>

<template>
  <button
    :class="[
      'px-2',
      'py-2',
      props.rounded ? 'rounded-full' : 'rounded-md',
      'font-semibold',
      'cursor-pointer',
      'transition-colors',
      'duration-300',
      'flex',
      'items-center',
      'justify-center',
      'gap-2',
      props.width ? 'w-full' : 'w-fit',
      classes[props.variant].bg,
      classes[props.variant].hover,
      classes[props.variant].text,
      classes[props.variant].border,
      props.margin ? 'mt-2' : '',
    ]"
    @click="$emit('event')"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>
