export interface TaskItemProps {
  id: string
  isCompleted: boolean
  text: string
  project: {
    title: string
    bg: string
  }
  priority: string
  period: string
}
