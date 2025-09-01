import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

export function formatDateTime(date: string | Date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(date))
}

export function isOverdue(date: string | Date) {
  return new Date(date) < new Date()
}

export function getDaysUntilDeadline(date: string | Date) {
  const deadline = new Date(date)
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function calculateProgress(tasks: Array<{ progress_percent: number }>) {
  if (tasks.length === 0) return 0
  const total = tasks.reduce((sum, task) => sum + task.progress_percent, 0)
  return Math.round(total / tasks.length)
}
