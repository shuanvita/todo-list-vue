<script setup lang="ts">
import { computed } from 'vue'

/**
 * Универсальный компонент для рендера SVG по имени файла (иконки, схемы, графика).
 *
 * @example Иконка (декоративная, по умолчанию)
 * <VSvg name="plus" />
 *
 * @example Значимая графика (требует aria-label)
 * <VSvg name="user-flow-diagram" :decorative="false" aria-label="Схема пользовательского флоу" />
 */
const props = withDefaults(
  defineProps<{
    name: string
    decorative?: boolean
  }>(),
  { decorative: true },
)

const modules = import.meta.glob<{ default: object }>('@/shared/icons/*.svg', {
  eager: true,
})

const icon = computed(() => {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${props.name}.svg`))

  if (!entry) {
    console.warn(`[VSvg] SVG not found: ${props.name}`)
    return null
  }

  return entry[1].default
})
</script>

<template>
  <component :is="icon" role="img" :aria-hidden="decorative || undefined" />
</template>
