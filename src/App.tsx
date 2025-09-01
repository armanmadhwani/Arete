import React from 'react'

const Dashboard = () => <div className="p-6"><h1 className="text-2xl font-bold">Dashboard</h1><p>Welcome to Arête</p></div>
const Projects = () => <div className="p-6"><h1 className="text-2xl font-bold">Projects</h1><p>Your projects will appear here</p></div>
const ProjectBoard = () => <div className="p-6"><h1 className="text-2xl font-bold">Project Board</h1><p>Kanban board view</p></div>
const Calendar = () => <div className="p-6"><h1 className="text-2xl font-bold">Calendar</h1><p>Calendar view</p></div>
const Timeline = () => <div className="p-6"><h1 className="text-2xl font-bold">Timeline</h1><p>Timeline view</p></div>
const Insights = () => <div className="p-6"><h1 className="text-2xl font-bold">Insights</h1><p>AI-powered insights</p></div>

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <h1 className="text-xl font-bold text-gray-900">Arête</h1>
    </header>
    <div className="flex">
      <nav className="w-64 bg-white shadow-sm min-h-screen p-4">
        <div className="space-y-2">
          <a href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Dashboard</a>
          <a href="/projects" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Projects</a>
          <a href="/projects/board" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Board</a>
          <a href="/calendar" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Calendar</a>
          <a href="/timeline" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Timeline</a>
          <a href="/insights" className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">Insights</a>
        </div>
      </nav>
      <main className="flex-1">{children}</main>
    </div>
  </div>
)

function App() {
  const path = window.location.pathname
  
  let component = <Dashboard />
  if (path === '/projects') component = <Projects />
  else if (path === '/projects/board') component = <ProjectBoard />
  else if (path === '/calendar') component = <Calendar />
  else if (path === '/timeline') component = <Timeline />
  else if (path === '/insights') component = <Insights />

  return <Layout>{component}</Layout>
}

export default App
