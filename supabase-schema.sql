-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    status TEXT CHECK (status IN ('planning', 'active', 'on-hold', 'completed', 'cancelled')) DEFAULT 'planning',
    start_date DATE,
    deadline DATE,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    attachments JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    checklist JSONB DEFAULT '{}',
    status TEXT CHECK (status IN ('todo', 'in-progress', 'review', 'done', 'blocked')) DEFAULT 'todo',
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    estimate_hours NUMERIC,
    actual_hours NUMERIC,
    start_date DATE,
    due_date DATE,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    blocking_tasks UUID[] DEFAULT '{}',
    assignees TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics runs table
CREATE TABLE analytics_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    period TEXT CHECK (period IN ('weekly', 'monthly')) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')) DEFAULT 'pending',
    model TEXT DEFAULT 'gemini-1.5-pro',
    summary JSONB DEFAULT '{}',
    score INTEGER CHECK (score >= 0 AND score <= 100),
    excel_url TEXT,
    pdf_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exports table
CREATE TABLE exports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    analytics_run_id UUID REFERENCES analytics_runs(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('xlsx', 'pdf')) NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_deadline ON projects(deadline);
CREATE INDEX idx_projects_user_status_deadline ON projects(user_id, status, deadline);

CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_project_status_due ON tasks(project_id, status, due_date);

CREATE INDEX idx_analytics_runs_user_id ON analytics_runs(user_id);
CREATE INDEX idx_analytics_runs_created_at ON analytics_runs(created_at DESC);
CREATE INDEX idx_analytics_runs_user_created ON analytics_runs(user_id, created_at DESC);

CREATE INDEX idx_exports_user_id ON exports(user_id);
CREATE INDEX idx_exports_analytics_run_id ON exports(analytics_run_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Sample data for development
INSERT INTO projects (user_id, title, description, tags, priority, status, start_date, deadline, progress_percent) VALUES
('00000000-0000-0000-0000-000000000001', 'Website Redesign', 'Complete overhaul of company website with modern design', ARRAY['web', 'design', 'frontend'], 'high', 'active', '2024-01-15', '2024-03-01', 65),
('00000000-0000-0000-0000-000000000001', 'Mobile App Development', 'Native iOS and Android app for customer engagement', ARRAY['mobile', 'ios', 'android'], 'high', 'active', '2024-02-01', '2024-05-15', 30),
('00000000-0000-0000-0000-000000000001', 'Database Migration', 'Migrate legacy database to PostgreSQL', ARRAY['database', 'migration', 'backend'], 'medium', 'planning', '2024-03-01', '2024-04-30', 0);

INSERT INTO tasks (user_id, project_id, title, status, priority, estimate_hours, actual_hours, start_date, due_date, progress_percent) VALUES
-- Website Redesign tasks
((SELECT id FROM projects WHERE title = 'Website Redesign'), '00000000-0000-0000-0000-000000000001', 'Design mockups', 'done', 'high', 16, 18, '2024-01-15', '2024-01-25', 100),
((SELECT id FROM projects WHERE title = 'Website Redesign'), '00000000-0000-0000-0000-000000000001', 'Frontend development', 'in-progress', 'high', 40, 25, '2024-01-26', '2024-02-15', 60),
((SELECT id FROM projects WHERE title = 'Website Redesign'), '00000000-0000-0000-0000-000000000001', 'Content migration', 'todo', 'medium', 12, 0, '2024-02-16', '2024-02-25', 0),
((SELECT id FROM projects WHERE title = 'Website Redesign'), '00000000-0000-0000-0000-000000000001', 'Testing and QA', 'todo', 'high', 8, 0, '2024-02-26', '2024-03-01', 0),

-- Mobile App tasks
((SELECT id FROM projects WHERE title = 'Mobile App Development'), '00000000-0000-0000-0000-000000000001', 'Requirements gathering', 'done', 'high', 8, 6, '2024-02-01', '2024-02-05', 100),
((SELECT id FROM projects WHERE title = 'Mobile App Development'), '00000000-0000-0000-0000-000000000001', 'UI/UX design', 'in-progress', 'high', 24, 12, '2024-02-06', '2024-02-20', 50),
((SELECT id FROM projects WHERE title = 'Mobile App Development'), '00000000-0000-0000-0000-000000000001', 'iOS development', 'todo', 'high', 60, 0, '2024-02-21', '2024-04-15', 0),
((SELECT id FROM projects WHERE title = 'Mobile App Development'), '00000000-0000-0000-0000-000000000001', 'Android development', 'todo', 'high', 60, 0, '2024-02-21', '2024-04-15', 0),

-- Database Migration tasks
((SELECT id FROM projects WHERE title = 'Database Migration'), '00000000-0000-0000-0000-000000000001', 'Schema analysis', 'todo', 'medium', 16, 0, '2024-03-01', '2024-03-08', 0),
((SELECT id FROM projects WHERE title = 'Database Migration'), '00000000-0000-0000-0000-000000000001', 'Data mapping', 'todo', 'medium', 20, 0, '2024-03-09', '2024-03-20', 0),
((SELECT id FROM projects WHERE title = 'Database Migration'), '00000000-0000-0000-0000-000000000001', 'Migration scripts', 'todo', 'high', 24, 0, '2024-03-21', '2024-04-10', 0),
((SELECT id FROM projects WHERE title = 'Database Migration'), '00000000-0000-0000-0000-000000000001', 'Testing and validation', 'todo', 'high', 16, 0, '2024-04-11', '2024-04-30', 0);
