import { supabase } from './supabase'
import { geminiService, type PerformanceMetrics, type AnalysisResult } from './gemini'
import { addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from 'date-fns'

export class AnalyticsService {
  async generatePerformanceMetrics(
    period: 'weekly' | 'monthly',
    userId: string,
    referenceDate: Date = new Date()
  ): Promise<PerformanceMetrics> {
    const dateRange = this.getDateRange(period, referenceDate)
    
    // Fetch projects and tasks for the period
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', dateRange.start.toISOString())
      .lte('created_at', dateRange.end.toISOString())

    const { data: allTasks } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)

    return this.computeMetrics(period, dateRange, projects || [], tasks || [], allTasks || [])
  }

  private getDateRange(period: 'weekly' | 'monthly', referenceDate: Date) {
    if (period === 'weekly') {
      return {
        start: startOfWeek(referenceDate),
        end: endOfWeek(referenceDate)
      }
    } else {
      return {
        start: startOfMonth(referenceDate),
        end: endOfMonth(referenceDate)
      }
    }
  }

  private computeMetrics(
    period: 'weekly' | 'monthly',
    dateRange: { start: Date; end: Date },
    projects: any[],
    tasks: any[],
    allTasks: any[]
  ): PerformanceMetrics {
    const completedTasks = tasks.filter(t => t.status === 'done')
    const overdueTasks = allTasks.filter(t => 
      t.due_date && new Date(t.due_date) < new Date() && t.status !== 'done'
    )

    // Calculate basic aggregates
    const tasksCreated = tasks.length
    const tasksCompleted = completedTasks.length
    const completionRate = tasksCreated > 0 ? Math.round((tasksCompleted / tasksCreated) * 100) : 0

    // On-time delivery rate
    const tasksWithDueDate = completedTasks.filter(t => t.due_date)
    const onTimeTasks = tasksWithDueDate.filter(t => 
      t.updated_at && t.due_date && new Date(t.updated_at) <= new Date(t.due_date)
    )
    const onTimeRate = tasksWithDueDate.length > 0 
      ? Math.round((onTimeTasks.length / tasksWithDueDate.length) * 100) 
      : 100

    // Overdue metrics
    const overdueCount = overdueTasks.length
    const avgOverdueDays = overdueCount > 0 
      ? Math.round(overdueTasks.reduce((sum, task) => {
          const dueDate = new Date(task.due_date)
          const today = new Date()
          return sum + Math.max(0, (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
        }, 0) / overdueCount)
      : 0

    // Cycle time calculation
    const avgCycleDays = completedTasks.length > 0
      ? Math.round(completedTasks.reduce((sum, task) => {
          if (task.start_date && task.updated_at) {
            const start = new Date(task.start_date)
            const end = new Date(task.updated_at)
            return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          }
          return sum + 7 // Default cycle time
        }, 0) / completedTasks.length)
      : 7

    // Work in Progress
    const wipTasks = allTasks.filter(t => t.status === 'in-progress')
    const wipAvg = wipTasks.length

    // Estimate accuracy
    const tasksWithEstimates = completedTasks.filter(t => t.estimate_hours && t.actual_hours)
    const estimateAccuracy = tasksWithEstimates.length > 0
      ? Math.round(tasksWithEstimates.reduce((sum, task) => {
          const accuracy = 1 - Math.abs(task.actual_hours - task.estimate_hours) / Math.max(task.estimate_hours, 1)
          return sum + Math.max(0, accuracy)
        }, 0) / tasksWithEstimates.length * 100)
      : 85

    // Throughput by priority
    const throughputByPriority = completedTasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Focus by tag (from projects)
    const focusByTag = projects.reduce((acc, project) => {
      if (project.tags) {
        project.tags.forEach((tag: string) => {
          acc[tag] = (acc[tag] || 0) + 1
        })
      }
      return acc
    }, {} as Record<string, number>)

    // Progress trend (mock data for now)
    const progressTrend = Array.from({ length: 7 }, (_, i) => ({
      date: format(addDays(dateRange.start, i), 'yyyy-MM-dd'),
      progress: Math.round(60 + Math.random() * 30)
    }))

    return {
      period,
      date_range: {
        start: format(dateRange.start, 'yyyy-MM-dd'),
        end: format(dateRange.end, 'yyyy-MM-dd')
      },
      aggregates: {
        tasks_created: tasksCreated,
        tasks_completed: tasksCompleted,
        completion_rate: completionRate,
        on_time_rate: onTimeRate,
        overdue_count: overdueCount,
        avg_overdue_days: avgOverdueDays,
        avg_cycle_days: avgCycleDays,
        wip_avg: wipAvg,
        estimate_accuracy: estimateAccuracy
      },
      trends: {
        throughput_by_priority: throughputByPriority,
        focus_by_tag: focusByTag,
        progress_trend: progressTrend,
        blocked_time: wipTasks.filter(t => t.status === 'blocked').length * 8, // 8 hours per blocked task
        dependency_lag: Math.round(Math.random() * 3) // Mock dependency lag
      },
      highlights: [
        `${completedTasks.length} tasks completed`,
        `${onTimeRate}% on-time delivery`,
        `${estimateAccuracy}% estimate accuracy`
      ]
    }
  }

  async runAnalysis(
    period: 'weekly' | 'monthly',
    userId: string,
    referenceDate: Date = new Date()
  ): Promise<{ runId: string; analysis: AnalysisResult }> {
    // Create analytics run record
    const { data: analyticsRun, error } = await supabase
      .from('analytics_runs')
      .insert({
        user_id: userId,
        period,
        start_date: this.getDateRange(period, referenceDate).start.toISOString().split('T')[0],
        end_date: this.getDateRange(period, referenceDate).end.toISOString().split('T')[0],
        status: 'running',
        model: 'gemini-1.5-pro'
      })
      .select()
      .single()

    if (error || !analyticsRun) {
      throw new Error('Failed to create analytics run')
    }

    try {
      // Generate performance metrics
      const metrics = await this.generatePerformanceMetrics(period, userId, referenceDate)
      
      // Run AI analysis
      const analysis = await geminiService.retryWithBackoff(
        () => geminiService.analyzePerformance(metrics),
        3,
        1000
      )

      // Update analytics run with results
      await supabase
        .from('analytics_runs')
        .update({
          status: 'completed',
          summary: analysis,
          score: analysis.score
        })
        .eq('id', analyticsRun.id)

      return { runId: analyticsRun.id, analysis }
    } catch (error) {
      // Mark run as failed
      await supabase
        .from('analytics_runs')
        .update({ status: 'failed' })
        .eq('id', analyticsRun.id)
      
      throw error
    }
  }

  async getAnalyticsHistory(userId: string, limit: number = 10) {
    const { data, error } = await supabase
      .from('analytics_runs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error('Failed to fetch analytics history')
    }

    return data
  }
}

export const analyticsService = new AnalyticsService()
