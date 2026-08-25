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
    <div v-if="store.tasks.length" class="border-stroke border">
      <TaskItem
        :class="['last:border-b-0', { 'line-through': task.isComplete }]"
        v-for="(task, index) in store.tasks"
        :key="task.id"
        :id="task.id"
        :label="task.text"
        :order-number="index + 1"
        @delete-task="store.deleteTask(task.id)"
        @complete-task="store.completedTask(task.id)"
      />
    </div>
  </div>
</template>
