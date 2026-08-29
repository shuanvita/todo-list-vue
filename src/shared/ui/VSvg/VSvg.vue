<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { Component } from 'vue'

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

const attrs = useAttrs()

const modules = import.meta.glob<{ default: Component }>('@/shared/icons/*.svg', {
  eager: true,
})

const iconsByName = new Map(
  Object.entries(modules).map(([path, mod]) => {
    const name = path.match(/([^/]+)\.svg$/)?.[1] ?? path
    return [name, mod.default]
  }),
)

const icon = computed(() => {
  const found = iconsByName.get(props.name)

  if (!found) {
    console.warn(`[VSvg] SVG not found: ${props.name}`)
    return null
  }

  if (!props.decorative && !attrs['aria-label'] && !attrs['aria-labelledby']) {
    console.warn(
      `[VSvg] name="${props.name}": decorative=false requires aria-label or aria-labelledby`,
    )
  }

  return found
})
</script>

<template>
  <component v-if="icon" :is="icon" role="img" :aria-hidden="decorative || undefined" />
</template>
