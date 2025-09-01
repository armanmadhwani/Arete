import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import { format } from 'date-fns'
import type { AnalysisResult, PerformanceMetrics } from './gemini'

export class ReportGenerator {
  async generateExcelReport(
    analysis: AnalysisResult,
    metrics: PerformanceMetrics,
    projects: any[],
    tasks: any[]
  ): Promise<Blob> {
    const workbook = XLSX.utils.book_new()

    // Overview Sheet
    const overviewData = [
      ['Arête Performance Report'],
      [`Period: ${metrics.period}`],
      [`Date Range: ${metrics.date_range.start} to ${metrics.date_range.end}`],
      [''],
      ['Key Performance Indicators'],
      ['Metric', 'Value'],
      ['Overall Score', `${analysis.score}/100`],
      ['Tasks Created', metrics.aggregates.tasks_created],
      ['Tasks Completed', metrics.aggregates.tasks_completed],
      ['Completion Rate', `${metrics.aggregates.completion_rate}%`],
      ['On-Time Rate', `${metrics.aggregates.on_time_rate}%`],
      ['Overdue Count', metrics.aggregates.overdue_count],
      ['Average Cycle Days', metrics.aggregates.avg_cycle_days],
      ['Estimate Accuracy', `${metrics.aggregates.estimate_accuracy}%`],
      [''],
      ['Analysis Summary'],
      ['Narrative', analysis.narrative],
      [''],
      ['Key Points'],
      ...analysis.bullets.map(bullet => ['', bullet])
    ]

    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData)
    
    // Set column widths
    overviewSheet['!cols'] = [
      { width: 20 },
      { width: 40 }
    ]

    // Projects Sheet
    // const projects = await getProjects()
    // const tasks = await getTasks()
    const projectsData = [
      ['Projects Overview'],
      [''],
      ['Title', 'Status', 'Priority', 'Progress', 'Deadline', 'Tags'],
      ...projects.map(project => [
        project.title,
        project.status,
        project.priority,
        `${project.progress_percent}%`,
        project.deadline || 'Not set',
        (project.tags || []).join(', ')
      ])
    ]

    const projectsSheet = XLSX.utils.aoa_to_sheet(projectsData)
    projectsSheet['!cols'] = [
      { width: 25 },
      { width: 15 },
      { width: 10 },
      { width: 10 },
      { width: 15 },
      { width: 30 }
    ]

    // Tasks Sheet
    const tasksData = [
      ['Tasks Overview'],
      [''],
      ['Title', 'Status', 'Priority', 'Progress', 'Due Date', 'Estimate (hrs)', 'Actual (hrs)'],
      ...tasks.map(task => [
        task.title,
        task.status,
        task.priority,
        `${task.progress_percent}%`,
        task.due_date || 'Not set',
        task.estimate_hours || 0,
        task.actual_hours || 0
      ])
    ]

    const tasksSheet = XLSX.utils.aoa_to_sheet(tasksData)
    tasksSheet['!cols'] = [
      { width: 30 },
      { width: 15 },
      { width: 10 },
      { width: 10 },
      { width: 15 },
      { width: 12 },
      { width: 12 }
    ]

    // Trends Sheet
    const trendsData = [
      ['Performance Trends'],
      [''],
      ['Throughput by Priority'],
      ['Priority', 'Tasks Completed'],
      ...Object.entries(metrics.trends.throughput_by_priority).map(([priority, count]) => [
        priority,
        count
      ]),
      [''],
      ['Focus by Tag'],
      ['Tag', 'Project Count'],
      ...Object.entries(metrics.trends.focus_by_tag).map(([tag, count]) => [
        tag,
        count
      ]),
      [''],
      ['Progress Trend'],
      ['Date', 'Progress %'],
      ...metrics.trends.progress_trend.map(item => [
        item.date,
        item.progress
      ])
    ]

    const trendsSheet = XLSX.utils.aoa_to_sheet(trendsData)
    trendsSheet['!cols'] = [
      { width: 20 },
      { width: 15 }
    ]

    // Recommendations Sheet
    const recommendationsData = [
      ['Recommended Actions'],
      [''],
      ['Title', 'Impact', 'Effort', 'Target Metric'],
      ...analysis.actions.map(action => [
        action.title,
        action.impact,
        action.effort,
        action.metric
      ])
    ]

    const recommendationsSheet = XLSX.utils.aoa_to_sheet(recommendationsData)
    recommendationsSheet['!cols'] = [
      { width: 40 },
      { width: 10 },
      { width: 10 },
      { width: 30 }
    ]

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview')
    XLSX.utils.book_append_sheet(workbook, projectsSheet, 'Projects')
    XLSX.utils.book_append_sheet(workbook, tasksSheet, 'Tasks')
    XLSX.utils.book_append_sheet(workbook, trendsSheet, 'Trends')
    XLSX.utils.book_append_sheet(workbook, recommendationsSheet, 'Recommendations')

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  }

  async generatePDFReport(
    analysis: AnalysisResult,
    metrics: PerformanceMetrics,
    _projects: any[],
    _tasks: any[]
  ): Promise<Blob> {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    let yPosition = 20

    // Helper function to add text with word wrapping
    const addText = (text: string, x: number, y: number, maxWidth?: number) => {
      if (maxWidth) {
        const lines = doc.splitTextToSize(text, maxWidth)
        doc.text(lines, x, y)
        return y + (lines.length * 6)
      } else {
        doc.text(text, x, y)
        return y + 6
      }
    }

    // Cover Page
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    yPosition = addText('Arête Performance Report', 20, yPosition)
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    yPosition = addText(`${metrics.period.charAt(0).toUpperCase() + metrics.period.slice(1)} Analysis`, 20, yPosition + 10)
    yPosition = addText(`${format(new Date(metrics.date_range.start), 'MMM dd')} - ${format(new Date(metrics.date_range.end), 'MMM dd, yyyy')}`, 20, yPosition + 5)
    
    // Score circle
    doc.setDrawColor(200, 211, 192) // Sage green
    doc.setFillColor(200, 211, 192)
    doc.circle(pageWidth - 40, 40, 20, 'F')
    
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(43, 30, 22) // Deep brown
    doc.text(analysis.score.toString(), pageWidth - 45, 45)
    
    doc.setFontSize(10)
    doc.text('/100', pageWidth - 35, 50)

    // New page for content
    doc.addPage()
    yPosition = 20

    // KPIs Section
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(43, 30, 22)
    yPosition = addText('Key Performance Indicators', 20, yPosition)
    yPosition += 10

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(111, 78, 55) // Brown

    const kpis = [
      ['Tasks Completed', `${metrics.aggregates.tasks_completed}/${metrics.aggregates.tasks_created}`],
      ['Completion Rate', `${metrics.aggregates.completion_rate}%`],
      ['On-Time Delivery', `${metrics.aggregates.on_time_rate}%`],
      ['Estimate Accuracy', `${metrics.aggregates.estimate_accuracy}%`],
      ['Average Cycle Time', `${metrics.aggregates.avg_cycle_days} days`],
      ['Overdue Tasks', `${metrics.aggregates.overdue_count}`]
    ]

    kpis.forEach(([label, value]) => {
      doc.text(label + ':', 20, yPosition)
      doc.setFont('helvetica', 'bold')
      doc.text(value, 80, yPosition)
      doc.setFont('helvetica', 'normal')
      yPosition += 8
    })

    yPosition += 10

    // Analysis Section
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(43, 30, 22)
    yPosition = addText('Performance Analysis', 20, yPosition)
    yPosition += 10

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(111, 78, 55)
    yPosition = addText(analysis.narrative, 20, yPosition, pageWidth - 40) + 10

    // Key Points
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    yPosition = addText('Key Insights', 20, yPosition)
    yPosition += 5

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    analysis.bullets.forEach(bullet => {
      doc.text('•', 20, yPosition)
      yPosition = addText(bullet, 25, yPosition, pageWidth - 45) + 2
    })

    yPosition += 10

    // Recommendations
    if (yPosition > pageHeight - 60) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(43, 30, 22)
    yPosition = addText('Recommended Actions', 20, yPosition)
    yPosition += 10

    doc.setFontSize(11)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(111, 78, 55)

    analysis.actions.forEach((action, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage()
        yPosition = 20
      }

      doc.setFont('helvetica', 'bold')
      yPosition = addText(`${index + 1}. ${action.title}`, 20, yPosition, pageWidth - 40)
      
      doc.setFont('helvetica', 'normal')
      yPosition = addText(`Impact: ${action.impact} | Effort: ${action.effort}`, 25, yPosition + 2)
      yPosition = addText(`Target: ${action.metric}`, 25, yPosition + 2) + 5
    })

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(111, 78, 55)
      doc.text(`Generated by Arête - ${format(new Date(), 'MMM dd, yyyy')}`, 20, pageHeight - 10)
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 30, pageHeight - 10)
    }

    return doc.output('blob')
  }

  async downloadFile(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const reportGenerator = new ReportGenerator()
