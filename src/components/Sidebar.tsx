import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderOpen, 
  Calendar, 
  Clock, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import { cn } from '../lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: FolderOpen },
  { name: 'Board', href: '/projects/board', icon: null },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Timeline', href: '/timeline', icon: Clock },
  { name: 'Insights', href: '/insights', icon: BarChart3 },
]

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-canvas-off-white border-r border-accent-sage/20 p-6">
      <div className="space-y-2">
        <button className="w-full btn-primary flex items-center justify-center space-x-2 mb-6">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
        
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-arete text-sm font-medium transition-arete',
                  isActive
                    ? 'bg-accent-sage text-text-deep-brown'
                    : 'text-text-brown hover:bg-accent-sage/10 hover:text-text-deep-brown'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="card p-4">
          <h3 className="font-semibold text-sm mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Active Projects</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Tasks This Week</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Completion Rate</span>
              <span className="font-medium text-accent-sage">78%</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
