import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task } from '@/entities/task'

export const useTasks = defineStore('useTasks', () => {
  const tasks = ref<Task[]>([])

  const addTask = (task: Task) => tasks.value.push(task)

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task: Task) => task.id !== id)
  }

  const doneTask = (id: string) => {
    const task = tasks.value.find((item: Task) => item.id === id)
    if (task) task.isComplete = !task.isComplete
  }

  const clearCompleted = () => {
    tasks.value = tasks.value.filter((task) => !task.isComplete)
  }

  const completedTasks = computed(() => tasks.value.filter((task: Task) => task.isComplete).length)

  const progressTasks = computed(() => tasks.value.filter((task: Task) => !task.isComplete).length)

  return {
    tasks,
    addTask,
    deleteTask,
    doneTask,
    completedTasks,
    progressTasks,
  }
})
