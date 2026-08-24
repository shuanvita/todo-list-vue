import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasks = defineStore('useTasks', () => {
  const tasks = ref([])

  return { tasks }
})
