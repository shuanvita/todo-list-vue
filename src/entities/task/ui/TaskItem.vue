<script setup lang="ts">
import type { TaskItemProps } from '@/entities/task'
import { VCheckbox } from '@/shared/ui/VCheckbox'
import { TaskBadge } from '@/shared/ui/taskBadge'
import VButton from '@/shared/ui/VButton'
import VSvg from '@/shared/ui/VSvg'

defineProps<TaskItemProps>()
defineEmits(['delete-task', 'toggle-complete'])

const checkboxId = crypto.randomUUID()
</script>

<template>
  <div class="border-stroke bg-card flex items-center gap-4 rounded-4xl border px-5 py-4">
    <VCheckbox
      class="shrink-0"
      :id="checkboxId"
      :modelValue="isCompleted"
      @update:modelValue="$emit('toggle-complete')"
    />
    <span :class="['flex-1 font-semibold', { 'line-through': isCompleted }]">{{ text }}</span>
    <TaskBadge>Design</TaskBadge>
    <VButton class="cursor-pointer" variant="custom" @click="$emit('delete-task')">
      <template #icon>
        <VSvg class="h-4 w-4 text-red-500" name="delete" />
      </template>
    </VButton>
  </div>
</template>

<style scoped></style>
