import TaskItem from './ui/TaskItem.vue'
import { useTasks } from './model/useTasks.store'
import type { Task } from './model/task.types'
import { createTask } from './model/createTask'

export { TaskItem, useTasks, createTask }
export type { Task }
