<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
}>()

const modules = import.meta.glob('@/shared/assets/svg/**/*.svg', {
  eager: true,
  import: 'default',
})

const icon = computed(() => {
  const icon = modules[`/src/shared/assets/svg/${props.name}.svg`]
  if (!icon) console.warn(`[VSvg] SVG not found: ${props.name}`)
  return icon ?? null
})
</script>

<template>
  <component :is="icon" role="img" aria-hidden="true" />
</template>
