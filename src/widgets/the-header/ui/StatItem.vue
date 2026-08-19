<script setup lang="ts">
defineProps<{
  count: number
  label: string
  variant?: 'primary' | 'muted'
}>()
</script>

<template>
  <div>
    <div
      :class="[
        'mb-1 text-3xl leading-none font-bold',
        variant === 'primary' ? 'text-primary' : 'text-fg-muted',
      ]"
    >
      {{ count }}
    </div>
    <div class="text-xs tracking-widest">{{ label }}</div>
  </div>
</template>
