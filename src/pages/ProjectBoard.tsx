import { useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'

const mockColumns = [
  { id: 'planning', title: 'Planning', color: 'bg-gray-100' },
  { id: 'active', title: 'Active', color: 'bg-blue-100' },
  { id: 'on-hold', title: 'On Hold', color: 'bg-orange-100' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100' }
]

const mockProjects = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of company website',
    status: 'active',
    priority: 'high',
    progress: 65,
    tasks: 4,
    deadline: '2024-03-01'
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native iOS and Android app',
    status: 'active',
    priority: 'high',
    progress: 30,
    tasks: 4,
    deadline: '2024-05-15'
  },
  {
    id: '3',
    title: 'Database Migration',
    description: 'Migrate legacy database to PostgreSQL',
    status: 'planning',
    priority: 'medium',
    progress: 0,
    tasks: 4,
    deadline: '2024-04-30'
  }
]

const priorityColors = {
  low: 'border-l-blue-400',
  medium: 'border-l-yellow-400',
  high: 'border-l-red-400'
}

export function ProjectBoard() {
  const [projects, setProjects] = useState(mockProjects)

  const getProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Board</h1>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockColumns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-text-deep-brown">{column.title}</h2>
              <span className="text-sm text-text-brown/60 bg-accent-sage/20 px-2 py-1 rounded-full">
                {getProjectsByStatus(column.id).length}
              </span>
            </div>

            <div className="space-y-3 min-h-[400px]">
              {getProjectsByStatus(column.id).map((project) => (
                <div
                  key={project.id}
                  className={`card cursor-pointer hover:shadow-arete-lg transition-arete border-l-4 ${priorityColors[project.priority as keyof typeof priorityColors]}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-text-deep-brown">{project.title}</h3>
                    <button className="p-1 hover:bg-accent-sage/10 rounded transition-arete">
                      <MoreHorizontal className="w-4 h-4 text-text-brown" />
                    </button>
                  </div>

                  <p className="text-sm text-text-brown/70 mb-3">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-brown/60">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-accent-sage/20 rounded-full h-2">
                      <div 
                        className="bg-accent-sage h-2 rounded-full transition-arete" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-text-brown/60">
                      <span>{project.tasks} tasks</span>
                      <span>Due {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.priority === 'high' ? 'bg-red-100 text-red-800' :
                        project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {project.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full p-4 border-2 border-dashed border-accent-sage/30 rounded-arete text-text-brown/60 hover:border-accent-sage/50 hover:text-text-brown transition-arete">
                <Plus className="w-5 h-5 mx-auto mb-2" />
                Add project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
