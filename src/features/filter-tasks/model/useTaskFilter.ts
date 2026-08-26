import { ref, computed } from 'vue'
import { useTasks } from '@/entities/task'

const currentFilter = ref<'all' | 'active' | 'completed'>('all')

export function useTaskFilter() {
  const store = useTasks()

  const visibleTasks = computed(() => {
    switch (currentFilter.value) {
      case 'active':
        return store.tasks.filter((task) => !task.isComplete)
      case 'completed':
        return store.tasks.filter((task) => task.isComplete)
      default:
        return store.tasks
    }
  })

  return { currentFilter, visibleTasks }
}
