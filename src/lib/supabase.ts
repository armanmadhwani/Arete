import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Project {
  id: string
  user_id: string
  title: string
  description?: string
  tags: string[]
  priority: 'low' | 'medium' | 'high'
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'
  start_date?: string
  deadline?: string
  progress_percent: number
  attachments?: any
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  project_id: string
  title: string
  checklist?: any
  status: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
  priority: 'low' | 'medium' | 'high'
  estimate_hours?: number
  actual_hours?: number
  start_date?: string
  due_date?: string
  progress_percent: number
  blocking_tasks: string[]
  assignees: string[]
  created_at: string
  updated_at: string
}

export interface AnalyticsRun {
  id: string
  user_id: string
  period: 'weekly' | 'monthly'
  start_date: string
  end_date: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  model: string
  summary?: any
  score?: number
  excel_url?: string
  pdf_url?: string
  created_at: string
}

export interface Export {
  id: string
  user_id: string
  analytics_run_id: string
  type: 'xlsx' | 'pdf'
  file_url: string
  created_at: string
}
