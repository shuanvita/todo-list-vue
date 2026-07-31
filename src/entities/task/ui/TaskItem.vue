<script setup lang="ts">
import type { TaskItemProps } from '@/entities/task'
import { VCheckbox } from '@/shared/ui/VCheckbox'
import { ref } from 'vue'

defineProps<TaskItemProps>()

const checkbox = ref(false)
const checkboxId = crypto.randomUUID()
</script>

<template>
  <div class="border-stroke bg-card flex items-center rounded-4xl border px-5 py-4">
    <VCheckbox :id="checkboxId" v-model="checkbox" />
    <span class="font-semibold">{{ text }}</span>
  </div>
</template>

<style scoped></style>
