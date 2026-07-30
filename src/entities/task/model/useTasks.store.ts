import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import type { TaskItemProps } from '@/entities/task'

export const useTasksStore = defineStore('useTasksStore', () => {
  const tasks: Ref<TaskItemProps[]> = ref([])

  const onAddTask = (task: TaskItemProps) => {
    tasks.value.push(task)
  }

  const onRemoveTask = () => {}

  const onCompleteTask = () => {
    console.log('onComplete task')
  }

  return { tasks, onAddTask, onRemoveTask, onCompleteTask }
})
