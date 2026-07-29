<script setup lang="ts">
import { StatCard } from '@/shared/ui/statCard'
import { computed, type ComputedRef } from 'vue'
import type { StatCardProps } from '@/shared/ui/statCard/StatCard.types.ts'

const statCards: ComputedRef<StatCardProps[]> = computed(() => [
  {
    title: 'Total Tasks',
    icon: 'list',
    count: 24,
    text: '+3 added today',
    variant: 'overdue',
  },
  {
    title: 'Completed',
    icon: 'done',
    count: 17,
    text: 'done',
    variant: 'completed',
  },
  {
    title: 'In Progress',
    icon: 'sun',
    count: 5,
    text: '2 due today',
    variant: 'progress',
  },
  {
    title: 'Overdue',
    icon: 'attention',
    count: 2,
    text: 'Need attention',
    variant: 'overdue',
  },
])
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <StatCard v-for="(card, index) in statCards" :key="index" v-bind="card" />
  </div>
</template>

<style scoped></style>
