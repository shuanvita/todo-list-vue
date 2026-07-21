<script setup lang="ts">
import type { ButtonProps } from './VButton.types'
import { computed, useSlots, watchEffect } from 'vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  disabled: false,
  type: 'button',
})

const slots = useSlots()

const variants = {
  default: 'bg-purple-600 text-white',
  primary: 'bg-primary hover:bg-secondary-300 hover:text-default',
  outline: 'border border-primary text-primary hover:bg-secondary',
  link: 'text-primary',
  custom: '',
}

const classes = computed(() => {
  if (props.variant === 'custom') {
    return undefined
  }

  return [
    'flex items-center justify-center gap-3',
    props.disabled
      ? 'cursor-not-allowed bg-slate-700 text-slate-500'
      : `${variants[props.variant]} cursor-pointer`,
  ]
})

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (slots.icon && !props.ariaLabel) {
      console.warn('[UiButton]: `ariaLabel` is recommended for icon-only buttons.')
    }
  })
}
</script>

<template>
  <button
    :class="[classes, props.variant !== 'custom' && !$slots.icon && 'px-5 py-4 lg:px-6']"
    :disabled="props.disabled"
    :type="props.type"
    :aria-label="props.ariaLabel"
  >
    <slot v-if="slots.icon" name="icon" />
    <template v-else>
      <slot name="preIcon" />
      <slot />
      <slot name="postIcon" />
    </template>
  </button>
</template>
