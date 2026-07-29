export interface StatCardProps {
  title: string
  icon: string
  count: number
  text: string
  variant?: 'total' | 'completed' | 'progress' | 'overdue'
}
