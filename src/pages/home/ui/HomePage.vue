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
    <AddTask />
    <TaskItem
      v-for="task in store.tasks"
      :key="task.id"
      :id="task.id"
      :label="task.text"
      @delete-task="store.deleteTask(task.id)"
    />
  </div>
</template>
