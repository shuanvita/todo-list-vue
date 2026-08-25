import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '@/entities/task'

export const useTasks = defineStore('useTasks', () => {
  const tasks = ref<Task[]>([])

  const addTask = (task: Task) => tasks.value.push(task)

  const deleteTask = (id: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== id)
  }

  return { tasks, addTask, deleteTask }
})
