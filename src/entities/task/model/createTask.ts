import type { Task } from '@/entities/task'

export function createTask(text: string): Task {
  return {
    id: crypto.randomUUID(),
    text,
    isComplete: false,
  }
}
