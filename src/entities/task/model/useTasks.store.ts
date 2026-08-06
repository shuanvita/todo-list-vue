import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { TaskItemProps } from '@/entities/task'

export const useTasksStore = defineStore('useTasksStore', () => {
  const tasks = ref<TaskItemProps[]>([])

  const onAddTask = (task: TaskItemProps) => {
    tasks.value.push(task)
  }

  const onRemoveTask = (id: string) => {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  const onCompleteTask = (id: string) => {
    const task = tasks.value.find((item) => item.id === id)
    if (task) task.isCompleted = !task.isCompleted
  }

  const countTasks = computed(() => tasks.value.length)

  const countCompletedTasks = computed(() => {})

  return { tasks, onAddTask, onRemoveTask, onCompleteTask, countTasks }
})
