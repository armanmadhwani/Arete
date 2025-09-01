import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    title: 'Website Redesign',
    startDate: '2024-01-15',
    endDate: '2024-03-01',
    progress: 65,
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    startDate: '2024-02-01',
    endDate: '2024-05-15',
    progress: 30,
    priority: 'high',
    status: 'active'
  },
  {
    id: '3',
    title: 'Database Migration',
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    progress: 0,
    priority: 'medium',
    status: 'planning'
  }
]

export function Timeline() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'months' | 'weeks'>('months')

  const getMonthsInView = () => {
    const months = []
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
    
    for (let i = 0; i < 6; i++) {
      const month = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1)
      months.push(month)
    }
    
    return months
  }

  const calculatePosition = (startDate: string, endDate: string) => {
    const viewStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
    const viewEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, 0)
    const projectStart = new Date(startDate)
    const projectEnd = new Date(endDate)
    
    const totalDays = (viewEnd.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24)
    const startOffset = (projectStart.getTime() - viewStart.getTime()) / (1000 * 60 * 60 * 24)
    const duration = (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
    
    const left = Math.max(0, (startOffset / totalDays) * 100)
    const width = Math.min(100 - left, (duration / totalDays) * 100)
    
    return { left: `${left}%`, width: `${width}%` }
  }

  const navigateTime = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (viewMode === 'months') {
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1))
      } else {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7))
      }
      return newDate
    })
  }

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Timeline</h1>
        <div className="flex items-center space-x-3">
          <div className="flex bg-canvas-off-white rounded-arete border border-accent-sage/20">
            <button
              onClick={() => setViewMode('months')}
              className={`px-4 py-2 text-sm font-medium rounded-l-arete transition-arete ${
                viewMode === 'months' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Months
            </button>
            <button
              onClick={() => setViewMode('weeks')}
              className={`px-4 py-2 text-sm font-medium rounded-r-arete transition-arete ${
                viewMode === 'weeks' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Weeks
            </button>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Project Timeline</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateTime('prev')}
              className="p-2 hover:bg-accent-sage/10 rounded-arete transition-arete"
            >
              <ChevronLeft className="w-5 h-5 text-text-brown" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-text-brown hover:bg-accent-sage/10 rounded-arete transition-arete"
            >
              Today
            </button>
            <button
              onClick={() => navigateTime('next')}
              className="p-2 hover:bg-accent-sage/10 rounded-arete transition-arete"
            >
              <ChevronRight className="w-5 h-5 text-text-brown" />
            </button>
          </div>
        </div>

        {/* Timeline Header */}
        <div className="relative mb-4">
          <div className="flex border-b border-accent-sage/20 pb-2">
            <div className="w-64 flex-shrink-0"></div>
            <div className="flex-1 grid grid-cols-6 gap-px">
              {getMonthsInView().map((month, index) => (
                <div key={index} className="text-center text-sm font-medium text-text-brown">
                  {monthNames[month.getMonth()]} {month.getFullYear()}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="space-y-4">
          {mockProjects.map((project) => {
            const position = calculatePosition(project.startDate, project.endDate)
            
            return (
              <div key={project.id} className="flex items-center">
                <div className="w-64 flex-shrink-0 pr-4">
                  <div>
                    <h3 className="font-medium text-text-deep-brown">{project.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.priority === 'high' ? 'bg-red-100 text-red-800' :
                        project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.priority}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'planning' ? 'bg-gray-100 text-gray-800' :
                        'bg-accent-sage/20 text-accent-sage'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 relative h-8">
                  <div className="absolute inset-y-0 w-full bg-accent-sage/10 rounded-arete"></div>
                  <div
                    className="absolute inset-y-0 bg-accent-sage rounded-arete flex items-center px-2 cursor-pointer hover:bg-accent-sage/90 transition-arete"
                    style={position}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-medium text-text-deep-brown truncate">
                        {project.title}
                      </span>
                      <span className="text-xs font-medium text-text-deep-brown ml-2">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress overlay */}
                  <div
                    className="absolute inset-y-0 bg-accent-sage/70 rounded-arete"
                    style={{
                      left: position.left,
                      width: `${parseFloat(position.width.replace('%', '')) * (project.progress / 100)}%`
                    }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Today indicator */}
        <div className="relative mt-4">
          <div className="flex">
            <div className="w-64 flex-shrink-0"></div>
            <div className="flex-1 relative">
              <div className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10" style={{ left: '33%' }}>
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="absolute -top-6 -left-6 text-xs text-red-500 font-medium">Today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
