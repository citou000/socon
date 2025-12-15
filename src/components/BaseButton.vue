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
  disabled: {
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
  tertiary: {
    bg: 'bg-transparent',
    hover: 'hover:bg-gray-400',
    text: 'text-gray-800',
    border: '',
  },
};
</script>

<template>
  <button
    :disabled="props.disabled"
    :class="[
      'px-2 py-2 font-semibold transition-colors duration-300 flex items-center justify-center gap-2',
      props.rounded ? 'rounded-full' : 'rounded-md',
      props.width ? 'w-full' : 'w-fit',
      classes[props.variant].bg,
      classes[props.variant].hover,
      classes[props.variant].text,
      classes[props.variant].border,
      props.margin ? 'mt-2' : '',
      props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    @click="$emit('event')"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>
