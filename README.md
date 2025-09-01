# Arête - Personal Project & Task Manager

A comprehensive full-stack personal project and task management application with AI-powered performance analysis, multiple view modes, and automated reporting.

## Features

### 🎯 Core Functionality
- **Project Management**: Create, edit, and track projects with tags, priorities, and deadlines
- **Task Management**: Detailed task tracking with estimates, actual hours, and progress
- **Multiple Views**: Dashboard, Projects Table, Kanban Board, Calendar, Timeline/Gantt
- **Progress Tracking**: Auto-computed or manual progress with visual indicators
- **Search & Filters**: Global search with sortable/filterable lists

### 🤖 AI Performance Analysis
- **Gemini Integration**: AI-powered performance insights using Google's Gemini 1.5 Pro
- **Metrics Analysis**: Completion rates, cycle times, estimate accuracy, throughput
- **Actionable Insights**: Prioritized recommendations with impact/effort scoring
- **Composite Scoring**: 0-100 performance score with detailed breakdown

### 📊 Reporting & Analytics
- **Excel Reports**: Multi-sheet workbooks with KPIs, trends, and recommendations
- **PDF Reports**: Professional branded reports with charts and analysis
- **Automated Scheduling**: Weekly/monthly report generation (stub implementation)
- **Export History**: Track and download previous analysis runs

### 🔐 Authentication & Security
- **Supabase Auth**: Email-based authentication with secure session management
- **Row Level Security**: User-scoped data access (ready for RLS policies)
- **Environment Variables**: Secure API key management

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom design system
- **React Query** for server state management
- **React Router** for navigation
- **Radix UI** for accessible components
- **Lucide React** for icons

### Backend & Data
- **Supabase** for PostgreSQL database and authentication
- **Google Gemini API** for AI analysis
- **Server Actions** for CRUD operations and AI processing

### Libraries & Tools
- **date-fns** for date manipulation
- **xlsx** for Excel report generation
- **jsPDF** for PDF report generation
- **Chart.js** for data visualization
- **Zod** for schema validation

## Design System

### Color Palette
- **Canvas**: Beige (#F4EDE4), Off-white (#FFFBF7)
- **Accents**: Baby Pink (#F6D9E6), Sage Green (#C8D3C0)
- **Text**: Brown (#6F4E37), Deep Brown (#2B1E16)

### Design Principles
- Calm, airy UI with rounded corners (12/16px)
- Soft shadows and 8px spacing grid
- 200ms ease transitions with reduced-motion support
- AA contrast compliance with sage green focus rings

## Database Schema

### Tables
- **projects**: Project data with tags, priorities, deadlines, progress
- **tasks**: Task details with estimates, blocking relationships, assignees
- **analytics_runs**: AI analysis results and metadata
- **exports**: Generated report files and download links

### Key Features
- UUID primary keys with automatic generation
- Timestamped records with auto-updating triggers
- Optimized indexes for performance
- JSONB fields for flexible metadata storage

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Google Cloud account with Gemini API access

### Environment Variables
Create a `.env` file with:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-1.5-pro
```

### Installation
1. Install dependencies: `npm install`
2. Set up Supabase database using `supabase-schema.sql`
3. Configure environment variables
4. Start development server: `npm run dev`

### Database Setup
Run the SQL migration in your Supabase dashboard:
```sql
-- See supabase-schema.sql for complete schema
```

## Usage

### Navigation
- **Dashboard**: Overview with KPIs, weekly tasks, and activity feed
- **Projects**: Sortable table with filters and bulk operations
- **Board**: Kanban view with drag-and-drop (visual only)
- **Calendar**: Month/week view of deadlines and milestones
- **Timeline**: Gantt chart with project timelines and dependencies
- **Insights**: AI performance analysis with downloadable reports

### Key Workflows
1. **Create Project**: Add title, description, tags, priority, and deadline
2. **Add Tasks**: Break down projects into trackable tasks with estimates
3. **Track Progress**: Use auto-computed or manual progress tracking
4. **Run Analysis**: Generate AI insights on performance metrics
5. **Download Reports**: Export Excel/PDF reports for stakeholders

## AI Analysis Features

### Metrics Computed
- Task creation and completion rates
- On-time delivery percentage
- Estimate accuracy and cycle times
- Work-in-progress and throughput analysis
- Focus distribution by tags and priorities

### AI Insights
- Performance narrative with quantified claims
- Strength and risk identification
- Prioritized action recommendations
- Habit experiments and improvement suggestions
- Composite scoring with detailed rubric

## Development Notes

### Architecture Decisions
- **Optimistic UI**: Immediate feedback with error rollback
- **Type Safety**: Full TypeScript coverage with Zod validation
- **Accessibility**: WCAG AA compliance with keyboard navigation
- **Performance**: React Query caching and optimized re-renders
- **Error Handling**: Graceful degradation with fallback states

### Future Enhancements
- Real-time collaboration features
- Mobile app with offline sync
- Advanced analytics dashboard
- Integration with external tools (GitHub, Slack, etc.)
- Custom report templates and scheduling

## License

MIT License - see LICENSE file for details

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Submit a pull request

---

Built with ❤️ using React, Supabase, and Google Gemini AI
