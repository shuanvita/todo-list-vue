<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string
  percent: number
}>()

const roundedPercent = computed(() => Math.round(Math.min(100, Math.max(0, props.percent))))
</script>

<template>
  <div>
    <div class="mb-2 flex items-center justify-between">
      <div class="text-fg-muted">{{ props.title }}</div>
      <div class="text-primary">{{ roundedPercent }}%</div>
    </div>
    <div
      class="bg-secondary h-1 w-full overflow-hidden rounded-full"
      role="progressbar"
      :aria-valuenow="roundedPercent"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="props.title"
    >
      <div
        class="bg-primary h-full rounded-full transition-[width] duration-200"
        :style="{ width: `${roundedPercent}%` }"
      ></div>
    </div>
  </div>
</template>
