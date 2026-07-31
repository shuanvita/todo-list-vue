import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TaskItemProps } from '@/entities/task'

export const useTasksStore = defineStore('useTasksStore', () => {
  const tasks = ref<TaskItemProps[]>([])

  const onAddTask = (task: TaskItemProps) => {
    tasks.value.push(task)
  }

  const onRemoveTask = () => {}

  const onCompleteTask = () => {
    console.log('onComplete task')
  }

  return { tasks, onAddTask, onRemoveTask, onCompleteTask }
})
