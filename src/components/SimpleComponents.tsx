import React from 'react';

// Simple placeholder components to fix build errors
export const LoginForm = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p>Authentication coming soon...</p>
    </div>
  </div>
);

export const ProgressTracker = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <div className="p-4 bg-gray-100 rounded">
    <label>Progress: {value}%</label>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full mt-2"
    />
  </div>
);

export const Sidebar = () => (
  <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r p-6">
    <nav className="space-y-2">
      <a href="/" className="block p-2 rounded hover:bg-gray-100">Dashboard</a>
      <a href="/projects" className="block p-2 rounded hover:bg-gray-100">Projects</a>
      <a href="/calendar" className="block p-2 rounded hover:bg-gray-100">Calendar</a>
      <a href="/timeline" className="block p-2 rounded hover:bg-gray-100">Timeline</a>
      <a href="/insights" className="block p-2 rounded hover:bg-gray-100">Insights</a>
    </nav>
  </aside>
);

export const TopBar = () => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex items-center px-6 z-50">
    <h1 className="text-xl font-bold">Arête</h1>
  </header>
);

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <TopBar />
    <Sidebar />
    <main className="ml-64 pt-16 p-6">
      {children}
    </main>
  </div>
);
