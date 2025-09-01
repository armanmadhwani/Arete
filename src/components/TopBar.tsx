import { Search, Calendar, Settings } from 'lucide-react'

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 bg-canvas-off-white border-b border-accent-sage/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-text-deep-brown">Arête</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-brown/60 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects and tasks..."
              className="input pl-10 w-96"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className="input">
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
          </select>
          
          <button className="p-2 rounded-arete hover:bg-accent-sage/10 transition-arete">
            <Calendar className="w-5 h-5 text-text-brown" />
          </button>
          
          <button className="p-2 rounded-arete hover:bg-accent-sage/10 transition-arete">
            <Settings className="w-5 h-5 text-text-brown" />
          </button>
        </div>
      </div>
    </header>
  )
}
