<script setup lang="ts">
import VSvg from '@/shared/ui/VSvg'

type ButtonVariant = 'primary' | 'secondary' | 'link' | 'custom'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    type?: 'button' | 'submit' | 'reset'
    icon?: string
    preIcon?: string
    postIcon?: string
    iconSize?: string
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    iconSize: 'w-4 h-4',
    disabled: false,
  },
)

const baseClasses =
  'group focus-visible:outline-ring cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-md text-[13px] tracking-widest transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-1 disabled:pointer-events-none disabled:opacity-30'

const variants: Record<ButtonVariant, string> = {
  primary: 'px-4 py-2 bg-primary hover:bg-primary/90 text-fg-primary font-medium',
  secondary: 'px-3 py-2 border border-stroke bg-secondary hover:border-primary/40 font-medium',
  link: 'px-3 py-2',
  custom: '',
}
</script>

<template>
  <button :class="[baseClasses, variants[variant]]" :type="type" :disabled="disabled">
    <VSvg v-if="icon" :name="icon" :class="iconSize" />
    <template v-else>
      <VSvg v-if="preIcon" :name="preIcon" :class="iconSize" />
      <slot />
      <VSvg v-if="postIcon" :name="postIcon" :class="iconSize" />
    </template>
  </button>
</template>
