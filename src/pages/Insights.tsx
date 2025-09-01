import { useState } from 'react'
import { Play, Download, Calendar, TrendingUp, Clock, Target, Brain } from 'lucide-react'

const mockAnalyticsRuns = [
  {
    id: '1',
    period: 'weekly',
    startDate: '2024-02-19',
    endDate: '2024-02-25',
    status: 'completed',
    score: 78,
    createdAt: '2024-02-25T10:30:00Z',
    excelUrl: '/reports/weekly-2024-02-25.xlsx',
    pdfUrl: '/reports/weekly-2024-02-25.pdf'
  },
  {
    id: '2',
    period: 'monthly',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    status: 'completed',
    score: 82,
    createdAt: '2024-02-29T15:45:00Z',
    excelUrl: '/reports/monthly-2024-02.xlsx',
    pdfUrl: '/reports/monthly-2024-02.pdf'
  },
  {
    id: '3',
    period: 'weekly',
    startDate: '2024-02-12',
    endDate: '2024-02-18',
    status: 'completed',
    score: 71,
    createdAt: '2024-02-18T09:15:00Z',
    excelUrl: '/reports/weekly-2024-02-18.xlsx',
    pdfUrl: '/reports/weekly-2024-02-18.pdf'
  }
]

const mockLatestAnalysis = {
  period: 'weekly',
  dateRange: 'Feb 19 - Feb 25, 2024',
  score: 78,
  narrative: 'This week showed strong progress with 85% task completion rate. The team maintained good velocity on the Website Redesign project, completing frontend development milestones ahead of schedule.',
  strengths: [
    'High task completion rate (85%)',
    'Consistent daily progress on active projects',
    'Effective time estimation accuracy (92%)'
  ],
  risks: [
    'Mobile App project showing early signs of scope creep',
    'Database Migration project delayed by 3 days',
    'Increasing technical debt in legacy systems'
  ],
  actions: [
    {
      title: 'Implement scope control for Mobile App',
      impact: 'High',
      effort: 'Medium',
      metric: 'Reduce scope creep by 40%'
    },
    {
      title: 'Accelerate Database Migration planning',
      impact: 'Medium',
      effort: 'Low',
      metric: 'Recover 3-day delay'
    }
  ]
}

export function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly'>('weekly')
  const [isRunning, setIsRunning] = useState(false)

  const handleRunAnalysis = async () => {
    setIsRunning(true)
    // Simulate API call
    setTimeout(() => {
      setIsRunning(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Performance Insights</h1>
        <div className="flex items-center space-x-3">
          <div className="flex bg-canvas-off-white rounded-arete border border-accent-sage/20">
            <button
              onClick={() => setSelectedPeriod('weekly')}
              className={`px-4 py-2 text-sm font-medium rounded-l-arete transition-arete ${
                selectedPeriod === 'weekly' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPeriod('monthly')}
              className={`px-4 py-2 text-sm font-medium rounded-r-arete transition-arete ${
                selectedPeriod === 'monthly' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Monthly
            </button>
          </div>
          <button 
            onClick={handleRunAnalysis}
            disabled={isRunning}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-text-deep-brown border-t-transparent rounded-full animate-spin"></div>
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Latest Analysis */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-sage/20 rounded-arete">
              <Brain className="w-6 h-6 text-accent-sage" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Latest Analysis</h2>
              <p className="text-sm text-text-brown/70">{mockLatestAnalysis.dateRange}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`text-2xl font-bold ${
              mockLatestAnalysis.score >= 80 ? 'text-green-600' :
              mockLatestAnalysis.score >= 60 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {mockLatestAnalysis.score}
            </div>
            <div className="text-sm text-text-brown/70">/ 100</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-3">Performance Summary</h3>
            <p className="text-text-brown/80 mb-4">{mockLatestAnalysis.narrative}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Strengths
                </h4>
                <ul className="space-y-1">
                  {mockLatestAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="text-sm text-text-brown/80 flex items-start">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-700 mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  Risks
                </h4>
                <ul className="space-y-1">
                  {mockLatestAnalysis.risks.map((risk, index) => (
                    <li key={index} className="text-sm text-text-brown/80 flex items-start">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Recommended Actions</h3>
            <div className="space-y-3">
              {mockLatestAnalysis.actions.map((action, index) => (
                <div key={index} className="p-3 bg-canvas-beige rounded-arete">
                  <h4 className="font-medium text-sm mb-2">{action.title}</h4>
                  <div className="flex justify-between text-xs text-text-brown/70">
                    <span>Impact: {action.impact}</span>
                    <span>Effort: {action.effort}</span>
                  </div>
                  <p className="text-xs text-text-brown/60 mt-1">{action.metric}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-4 space-y-2">
              <button className="w-full btn-secondary text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download Excel
              </button>
              <button className="w-full btn-secondary text-sm">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis History */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Analysis History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-sage/20">
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Period</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Date Range</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Created</th>
                <th className="text-right py-3 px-4 font-semibold text-text-deep-brown">Downloads</th>
              </tr>
            </thead>
            <tbody>
              {mockAnalyticsRuns.map((run) => (
                <tr key={run.id} className="border-b border-accent-sage/10 hover:bg-canvas-beige/50 transition-arete">
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      run.period === 'weekly' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {run.period}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-text-brown">
                    {new Date(run.startDate).toLocaleDateString()} - {new Date(run.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <div className={`text-lg font-semibold ${
                      run.score >= 80 ? 'text-green-600' :
                      run.score >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {run.score}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {run.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-text-brown">
                    {new Date(run.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 text-text-brown hover:text-text-deep-brown transition-arete">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
