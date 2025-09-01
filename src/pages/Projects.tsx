import { useState } from 'react'
import { Search, Filter, Download, Plus, MoreHorizontal, Calendar, Tag } from 'lucide-react'

const mockProjects = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    tags: ['web', 'design', 'frontend'],
    priority: 'high',
    status: 'active',
    deadline: '2024-03-01',
    progress: 65,
    tasks: 4
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    tags: ['mobile', 'ios', 'android'],
    priority: 'high',
    status: 'active',
    deadline: '2024-05-15',
    progress: 30,
    tasks: 4
  },
  {
    id: '3',
    title: 'Database Migration',
    description: 'Migrate legacy database to PostgreSQL',
    tags: ['database', 'migration', 'backend'],
    priority: 'medium',
    status: 'planning',
    deadline: '2024-04-30',
    progress: 0,
    tasks: 4
  }
]

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

const statusColors = {
  planning: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  'on-hold': 'bg-orange-100 text-orange-800',
  completed: 'bg-accent-sage/20 text-accent-sage',
  cancelled: 'bg-red-100 text-red-800'
}

export function Projects() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-brown/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <select 
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
            </select>
            
            <button className="btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button className="px-3 py-1 text-sm bg-accent-pink/20 text-text-brown rounded-full hover:bg-accent-pink/30 transition-arete">
            Due this week
          </button>
          <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-arete">
            Overdue
          </button>
          <button className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-arete">
            High priority
          </button>
          <button className="px-3 py-1 text-sm bg-accent-sage/20 text-text-brown rounded-full hover:bg-accent-sage/30 transition-arete">
            Blocked
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-accent-sage/20">
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Project</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Progress</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Deadline</th>
                <th className="text-left py-3 px-4 font-semibold text-text-deep-brown">Tasks</th>
                <th className="text-right py-3 px-4 font-semibold text-text-deep-brown">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockProjects.map((project) => (
                <tr key={project.id} className="border-b border-accent-sage/10 hover:bg-canvas-beige/50 transition-arete">
                  <td className="py-4 px-4">
                    <div>
                      <h3 className="font-medium text-text-deep-brown">{project.title}</h3>
                      <p className="text-sm text-text-brown/70 mt-1">{project.description}</p>
                      <div className="flex gap-1 mt-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-accent-sage/20 text-text-brown rounded-full">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[project.priority as keyof typeof priorityColors]}`}>
                      {project.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-accent-sage/20 rounded-full h-2">
                        <div 
                          className="bg-accent-sage h-2 rounded-full transition-arete" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-text-brown">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-text-brown">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.deadline).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-text-brown">{project.tasks} tasks</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 hover:bg-accent-sage/10 rounded-arete transition-arete">
                      <MoreHorizontal className="w-4 h-4 text-text-brown" />
                    </button>
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
