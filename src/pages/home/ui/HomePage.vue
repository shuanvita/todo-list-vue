<script setup lang="ts">
import { TheHeader } from '@/widgets/the-header'
import { AddTask } from '@/features/add-task'
import { TaskItem } from '@/entities/task'

import { useTasks } from '@/entities/task'

const store = useTasks()
</script>

<template>
  <div class="container">
    <TheHeader class="mb-11" />
    <AddTask class="mb-6" />
    <div v-if="store.tasks.length" class="border-stroke mb-6 border">
      <TaskItem
        v-for="(task, index) in store.tasks"
        :key="task.id"
        :label="task.text"
        :order-number="index + 1"
        @delete-task="store.deleteTask(task.id)"
        @complete-task="store.doneTask(task.id)"
      />
    </div>
    <div class="text-fg-muted flex items-center justify-between text-xs uppercase">
      <div>{{ store.tasks.length }} всего задач</div>
      <div>Enter - добавить</div>
    </div>
  </div>
</template>
