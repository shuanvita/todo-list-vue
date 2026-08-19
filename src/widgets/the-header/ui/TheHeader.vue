<script setup lang="ts">
import { formatDate } from '../lib/formatDate'
import StatItem from './StatItem.vue'

const today = formatDate()
</script>

<template>
  <header class="border-stroke flex items-end justify-between gap-3 border-b pb-6">
    <div>
      <div class="text-fg-muted mb-2 text-xs tracking-widest">ЗАДАЧИ / {{ today }}</div>
      <div class="text-fg text-4xl leading-none font-bold tracking-tight uppercase">
        Todo<span class="text-primary">_</span>
      </div>
    </div>
    <div class="flex gap-6 text-right uppercase">
      <StatItem :count="3" label="Готово" variant="primary" />
      <StatItem :count="2" label="Осталось" />
    </div>
  </header>
</template>
