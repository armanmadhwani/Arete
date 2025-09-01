import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'

const mockEvents = [
  { id: '1', title: 'Website Redesign', date: '2024-03-01', type: 'deadline', priority: 'high' },
  { id: '2', title: 'Mobile App Development', date: '2024-05-15', type: 'deadline', priority: 'high' },
  { id: '3', title: 'Database Migration', date: '2024-04-30', type: 'deadline', priority: 'medium' },
  { id: '4', title: 'Frontend development', date: '2024-02-15', type: 'task', priority: 'high' },
  { id: '5', title: 'UI/UX design', date: '2024-02-20', type: 'task', priority: 'high' }
]

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'week'>('month')

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    const dateStr = date.toISOString().split('T')[0]
    return mockEvents.filter(event => event.date === dateStr)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex items-center space-x-3">
          <div className="flex bg-canvas-off-white rounded-arete border border-accent-sage/20">
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 text-sm font-medium rounded-l-arete transition-arete ${
                view === 'month' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 text-sm font-medium rounded-r-arete transition-arete ${
                view === 'week' 
                  ? 'bg-accent-sage text-text-deep-brown' 
                  : 'text-text-brown hover:bg-accent-sage/10'
              }`}
            >
              Week
            </button>
          </div>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
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
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-accent-sage/10 rounded-arete transition-arete"
            >
              <ChevronRight className="w-5 h-5 text-text-brown" />
            </button>
          </div>
        </div>

        {view === 'month' && (
          <div className="grid grid-cols-7 gap-px bg-accent-sage/20 rounded-arete overflow-hidden">
            {dayNames.map((day) => (
              <div key={day} className="bg-canvas-off-white p-3 text-center font-semibold text-text-deep-brown">
                {day}
              </div>
            ))}
            
            {getDaysInMonth(currentDate).map((date, index) => {
              const events = getEventsForDate(date)
              const isToday = date && date.toDateString() === new Date().toDateString()
              
              return (
                <div
                  key={index}
                  className={`bg-canvas-off-white p-2 min-h-[100px] ${
                    date ? 'hover:bg-canvas-beige cursor-pointer' : ''
                  } transition-arete`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${
                        isToday 
                          ? 'bg-accent-sage text-text-deep-brown w-6 h-6 rounded-full flex items-center justify-center' 
                          : 'text-text-brown'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${
                              event.type === 'deadline' 
                                ? event.priority === 'high' 
                                  ? 'bg-red-500' 
                                  : 'bg-orange-500'
                                : 'bg-accent-sage'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {events.length > 2 && (
                          <div className="text-xs text-text-brown/60">
                            +{events.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {view === 'week' && (
          <div className="text-center text-text-brown/60 py-12">
            <p>Week view coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}
