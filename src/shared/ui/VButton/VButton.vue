<script setup lang="ts">
import { useSlots } from 'vue'

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'custom'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

const slots = useSlots()

const variants: Record<ButtonVariant, string> = {
  primary: 'px-3 py-3 bg-primary hover:bg-primary/90 text-fg-primary font-bold',
  secondary:
    'px-3 py-3 border border-stroke text-fg-muted hover:bg-secondary hover:text-fg font-medium',
  link: 'text-fg-muted hover:text-accent p-0',
  custom: '',
}
</script>

<template>
  <button
    :class="[
      'group focus-visible:outline-accent inline-flex items-center justify-center gap-2 text-xs tracking-widest uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1',
      variants[variant],
      disabled ? 'pointer-events-none cursor-not-allowed opacity-30' : 'cursor-pointer',
    ]"
    :type="type"
    :disabled="disabled"
  >
    <slot v-if="slots.icon" name="icon" />
    <template v-else>
      <slot name="preIcon" />
      <slot />
      <slot name="postIcon" />
    </template>
  </button>
</template>
