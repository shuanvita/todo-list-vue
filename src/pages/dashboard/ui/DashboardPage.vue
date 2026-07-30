<script setup lang="ts">
import { StatCardList } from '@/widgets/statCardList'
import { VInput } from '@/shared/ui/VInput'
import VButton from '@/shared/ui/VButton'
import { useTasksStore } from '@/entities/task'
import { type Ref, ref } from 'vue'
import type { TaskItemProps } from '@/entities/task'

const store = useTasksStore()

const { onAddTask } = store

const task: Ref<Omit<TaskItemProps, 'id' | 'isCompleted'>> = ref({
  id: '',
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
    <div v-for="item in store.tasks" :key="item.id">{{ item.text }}</div>
  </div>
</template>

<style scoped></style>
