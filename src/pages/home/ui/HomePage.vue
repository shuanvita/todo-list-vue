<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { AddTask } from '@/features/add-task'
import { FilterTasks } from '@/features/filter-tasks'
import { useTaskFilter } from '@/features/filter-tasks'
import { TaskItem } from '@/entities/task'
import { useTasks } from '@/entities/task'
import { VInput } from '@/shared/ui/VInput'

const store = useTasks()
const { visibleTasks } = useTaskFilter()
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <AddTask class="mb-8" />
    <FilterTasks class="mb-6" />
    <VInput class="mb-8" placeholder="Добавить задачу..." error error-message="fdsfsdf" />
    <VInput class="mb-8" placeholder="Добавить задачу..." />
    <VInput class="mb-8" placeholder="Добавить задачу..." disabled />
    <div v-if="store.tasks.length" class="border-stroke mb-6 border">
      <TaskItem
        v-for="(task, index) in visibleTasks"
        :key="task.id"
        :label="task.text"
        :order-number="index + 1"
        :is-complete="task.isComplete"
        @delete-task="store.deleteTask(task.id)"
        @complete-task="store.doneTask(task.id)"
      />
    </div>
    <div
      class="text-fg-muted border-stroke mb-6 flex items-center justify-center border p-6"
      v-else
    >
      <div>Список задач пока пуст</div>
    </div>
    <footer class="text-fg-muted flex items-center justify-between text-xs uppercase">
      <div>{{ store.tasks.length }} всего задач</div>
      <div>Enter - добавить</div>
    </footer>
  </div>
</template>
