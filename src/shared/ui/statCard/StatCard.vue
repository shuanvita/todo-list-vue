<script setup lang="ts">
import type { StatCardProps } from './StatCard.types.ts'
import VSvg from '@/shared/ui/VSvg'

defineProps<StatCardProps>()
</script>

<template>
  <div :class="['text-primary-foreground flex flex-col gap-2 rounded-4xl p-5', variant]">
    <div class="flex items-center justify-between">
      <div class="text-[14px] font-semibold">{{ title }}</div>
      <div class="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/20">
        <VSvg class="h-[17px] w-[17px]" :name="icon" />
      </div>
    </div>
    <div class="text-[36px] font-bold">{{ count }}</div>
    <div class="text-[12px]">{{ text }}</div>
  </div>
</template>

<style scoped>
.total {
  background-image: linear-gradient(135deg, #7c3aed 0%, #a21caf 100%);
}
.completed {
  background-image: linear-gradient(135deg, #06d6a0 0%, #0096c7 100%);
}
.progress {
  background-image: linear-gradient(135deg, #ff6b35 0%, #ffd166 100%);
}
.overdue {
  background-image: linear-gradient(135deg, #f72585 0%, #b5179e 100%);
}
</style>
