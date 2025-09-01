import { GoogleGenerativeAI } from '@google/generative-ai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBYog0ePAO3hCiw8HoI9IPX4ixLLPtg490'
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-1.5-pro'

interface PerformanceMetrics {
  period: 'weekly' | 'monthly'
  date_range: { start: string; end: string }
  aggregates: {
    tasks_created: number
    tasks_completed: number
    completion_rate: number
    on_time_rate: number
    overdue_count: number
    avg_overdue_days: number
    avg_cycle_days: number
    wip_avg: number
    estimate_accuracy: number
  }
  trends: {
    throughput_by_priority: Record<string, number>
    focus_by_tag: Record<string, number>
    progress_trend: Array<{ date: string; progress: number }>
    blocked_time: number
    dependency_lag: number
  }
  highlights: string[]
}

interface AnalysisResult {
  narrative: string
  bullets: string[]
  score: number
  actions: Array<{
    title: string
    impact: string
    effort: string
    metric: string
  }>
  charts: {
    type: string
    data: any
  }
}

class GeminiService {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor() {
    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY)
    this.model = this.genAI.getGenerativeModel({ 
      model: GEMINI_MODEL,
      generationConfig: {
        temperature: 0.1,
        topK: 1,
        topP: 0.8,
        maxOutputTokens: 2048,
      }
    })
  }

  async analyzePerformance(metrics: PerformanceMetrics): Promise<AnalysisResult> {
    const systemPrompt = `You are a precise performance analyst. Use only supplied metrics; do not speculate. Quantify every claim. Return the specified JSON schema.

    Analyze the provided performance metrics and return a structured analysis with:
    1. A narrative summary (2-3 sentences)
    2. Key bullet points (3-5 items)
    3. A composite score (0-100) based on completion rate, on-time delivery, and estimate accuracy
    4. 2-5 prioritized actions with impact, effort, and target metric
    5. Chart configuration for visualization

    Focus on actionable insights tied directly to the provided metrics.`

    const userPrompt = `Analyze this ${metrics.period} performance data:

    **Metrics:**
    - Tasks Created: ${metrics.aggregates.tasks_created}
    - Tasks Completed: ${metrics.aggregates.tasks_completed}
    - Completion Rate: ${metrics.aggregates.completion_rate}%
    - On-Time Rate: ${metrics.aggregates.on_time_rate}%
    - Overdue Count: ${metrics.aggregates.overdue_count}
    - Average Overdue Days: ${metrics.aggregates.avg_overdue_days}
    - Average Cycle Days: ${metrics.aggregates.avg_cycle_days}
    - Work in Progress (Avg): ${metrics.aggregates.wip_avg}
    - Estimate Accuracy: ${metrics.aggregates.estimate_accuracy}%

    **Trends:**
    - Throughput by Priority: ${JSON.stringify(metrics.trends.throughput_by_priority)}
    - Focus by Tag: ${JSON.stringify(metrics.trends.focus_by_tag)}
    - Blocked Time: ${metrics.trends.blocked_time} hours
    - Dependency Lag: ${metrics.trends.dependency_lag} days

    **Highlights:** ${metrics.highlights.join(', ')}

    Return valid JSON with this exact structure:
    {
      "narrative": "string",
      "bullets": ["string"],
      "score": number,
      "actions": [{"title": "string", "impact": "string", "effort": "string", "metric": "string"}],
      "charts": {"type": "string", "data": {}}
    }`

    try {
      const result = await this.model.generateContent([
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: userPrompt }] }
      ])

      const response = await result.response
      const text = response.text()
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error('Gemini API error:', error)
      
      // Return fallback analysis
      return this.getFallbackAnalysis(metrics)
    }
  }

  private getFallbackAnalysis(metrics: PerformanceMetrics): AnalysisResult {
    const score = Math.round(
      (metrics.aggregates.completion_rate * 0.4) +
      (metrics.aggregates.on_time_rate * 0.3) +
      (metrics.aggregates.estimate_accuracy * 0.3)
    )

    return {
      narrative: `${metrics.period} analysis shows ${metrics.aggregates.completion_rate}% task completion with ${metrics.aggregates.on_time_rate}% on-time delivery. Estimate accuracy at ${metrics.aggregates.estimate_accuracy}% indicates ${metrics.aggregates.estimate_accuracy > 80 ? 'good' : 'needs improvement'} planning precision.`,
      bullets: [
        `Completed ${metrics.aggregates.tasks_completed} of ${metrics.aggregates.tasks_created} tasks`,
        `${metrics.aggregates.overdue_count} tasks overdue with ${metrics.aggregates.avg_overdue_days} avg delay days`,
        `Average cycle time: ${metrics.aggregates.avg_cycle_days} days`,
        `Work in progress: ${metrics.aggregates.wip_avg} tasks average`
      ],
      score,
      actions: [
        {
          title: 'Improve task estimation accuracy',
          impact: 'High',
          effort: 'Medium',
          metric: `Target 90% estimate accuracy (current: ${metrics.aggregates.estimate_accuracy}%)`
        },
        {
          title: 'Reduce overdue tasks',
          impact: 'Medium',
          effort: 'Low',
          metric: `Reduce overdue count to <2 (current: ${metrics.aggregates.overdue_count})`
        }
      ],
      charts: {
        type: 'completion_trend',
        data: metrics.trends.progress_trend
      }
    }
  }

  async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        if (attempt === maxRetries) {
          throw error
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
    
    throw new Error('Max retries exceeded')
  }
}

export const geminiService = new GeminiService()
export type { PerformanceMetrics, AnalysisResult }
