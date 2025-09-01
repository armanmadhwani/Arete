import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthGuard } from './components/AuthGuard'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { ProjectBoard } from './pages/ProjectBoard'
import { Calendar } from './pages/Calendar'
import { Timeline } from './pages/Timeline'
import { Insights } from './pages/Insights'

function App() {
  return (
    <AuthGuard>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/board" element={<ProjectBoard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </Layout>
    </AuthGuard>
  )
}

export default App
