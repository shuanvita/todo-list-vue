<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTasks } from '@/entities/task'
import { useTaskFilter } from '../model/useTaskFilter'
import { VButton } from '@/shared/ui/VButton'

const store = useTasks()

const { clearCompleted } = store
const { currentFilter } = useTaskFilter()

const filters = [
  {
    id: 'all',
    text: 'Все',
  },
  {
    id: 'active',
    text: 'Активные',
  },
  {
    id: 'completed',
    text: 'Выполнено',
  },
]
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <div>
      <VButton
        v-for="button in filters"
        :key="button.id"
        :variant="currentFilter === button.id ? 'primary' : 'secondary'"
        @click="currentFilter = button.id"
        >{{ button.text }}
      </VButton>
    </div>
    <VButton variant="link" @click="clearCompleted"
      >Очистить выполненные ({{ store.completedTasks }})</VButton
    >
  </div>
</template>

<style scoped></style>
