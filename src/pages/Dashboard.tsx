import { Plus, TrendingUp, Clock, AlertTriangle, CheckCircle } from 'lucide-react'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-brown/70">Active Projects</p>
              <p className="text-2xl font-bold text-text-deep-brown">3</p>
            </div>
            <div className="p-3 bg-accent-sage/20 rounded-arete">
              <TrendingUp className="w-6 h-6 text-accent-sage" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-brown/70">Tasks This Week</p>
              <p className="text-2xl font-bold text-text-deep-brown">12</p>
            </div>
            <div className="p-3 bg-accent-pink/20 rounded-arete">
              <Clock className="w-6 h-6 text-accent-pink" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-brown/70">Overdue</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </div>
            <div className="p-3 bg-red-100 rounded-arete">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-brown/70">Completion Rate</p>
              <p className="text-2xl font-bold text-green-600">78%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-arete">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* This Week Panel */}
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-semibold mb-4">This Week</h2>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
              <div key={day} className="border-l-4 border-accent-sage pl-4">
                <h3 className="font-medium text-text-deep-brown">{day}</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between p-2 bg-canvas-beige rounded-arete">
                    <span className="text-sm">Frontend development</span>
                    <span className="text-xs text-text-brown/60">Website Redesign</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-canvas-beige rounded-arete">
                    <span className="text-sm">UI/UX design</span>
                    <span className="text-xs text-text-brown/60">Mobile App</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent-sage rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Completed "Design mockups"</p>
                <p className="text-xs text-text-brown/60">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent-pink rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Started "Frontend development"</p>
                <p className="text-xs text-text-brown/60">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-accent-sage rounded-full mt-2"></div>
              <div>
                <p className="text-sm">Created "Mobile App Development"</p>
                <p className="text-xs text-text-brown/60">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
