<script setup lang="ts">
import { StatCardList } from '@/widgets/statCardList'
import { VInput } from '@/shared/ui/VInput'
import VButton from '@/shared/ui/VButton'
import { TaskItem, useTasksStore } from '@/entities/task'
import { type Ref, ref } from 'vue'
import type { TaskItemProps } from '@/entities/task'

const store = useTasksStore()

const { onAddTask, onRemoveTask, onCompleteTask } = store

const task: Ref<Omit<TaskItemProps, 'id' | 'isCompleted'>> = ref({
  text: '',
  project: {
    title: 'Design',
    bg: 'purple',
  },
  priority: 'High',
  period: 'Today',
})

const handleNewTask = () => {
  if (!task.value.text) return

  onAddTask({
    id: crypto.randomUUID(),
    isCompleted: false,
    text: task.value.text,
    project: { ...task.value.project },
    priority: task.value.priority,
    period: task.value.period,
  })
  task.value.text = ''
}
</script>

<template>
  <div class="space-y-8">
    <StatCardList />
    <VInput v-model.trim="task.text" placeholder="Add task..." @keyup.enter="handleNewTask" />
    <VButton variant="primary" @click="handleNewTask">Add task</VButton>
    <TaskItem
      v-for="item in store.tasks"
      :key="item.id"
      v-bind="item"
      @delete-task="onRemoveTask(item.id)"
      @toggle-complete="onCompleteTask(item.id)"
    />
  </div>
</template>

<style scoped></style>
