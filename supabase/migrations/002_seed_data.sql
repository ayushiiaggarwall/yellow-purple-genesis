-- Seed initial data
-- Insert a default cohort
INSERT INTO cohorts (id, name, start_date, end_date, is_active) VALUES 
(uuid_generate_v4(), 'No-Code to Product - Cohort 1', '2024-09-01', '2024-10-06', true);

-- Get the cohort ID for use in other inserts
WITH active_cohort AS (
    SELECT id as cohort_id FROM cohorts WHERE is_active = true LIMIT 1
)

-- Insert sample lessons
INSERT INTO lessons (week, title, slug, summary, content, resources, visible) VALUES 
(1, 'No-Code Foundations', 'no-code-foundations', 'Learn the basics of no-code development and explore the ecosystem of tools available.', 
 '{"sections": [{"title": "What is No-Code?", "content": "Introduction to no-code development..."}, {"title": "Tool Overview", "content": "Overview of popular no-code platforms..."}]}',
 '{"links": [{"title": "Lovable Starter Template", "url": "https://lovable.dev"}, {"title": "Tool Comparison Guide", "url": "#"}]}',
 true),

(2, 'Building Your First App', 'building-your-first-app', 'Hands-on experience building a complete application using Lovable.', 
 '{"sections": [{"title": "Project Setup", "content": "Setting up your development environment..."}, {"title": "UI Design", "content": "Creating beautiful interfaces..."}]}',
 '{"links": [{"title": "Project Template", "url": "#"}, {"title": "Design Resources", "url": "#"}]}',
 true),

(3, 'Database & Backend Integration', 'database-backend-integration', 'Connect your app to databases and external APIs using Supabase.', 
 '{"sections": [{"title": "Database Design", "content": "Planning your data structure..."}, {"title": "API Integration", "content": "Connecting to external services..."}]}',
 '{"links": [{"title": "Supabase Tutorial", "url": "#"}, {"title": "API Examples", "url": "#"}]}',
 true),

(4, 'Automation & Workflows', 'automation-workflows', 'Automate processes and create powerful workflows using n8n.', 
 '{"sections": [{"title": "Workflow Design", "content": "Creating automated processes..."}, {"title": "Integration Patterns", "content": "Common automation scenarios..."}]}',
 '{"links": [{"title": "n8n Workflows", "url": "#"}, {"title": "Integration Templates", "url": "#"}]}',
 true),

(5, 'Launch & Scale', 'launch-scale', 'Deploy your application and prepare for scaling.', 
 '{"sections": [{"title": "Deployment", "content": "Going live with your application..."}, {"title": "Growth Strategies", "content": "Scaling your no-code product..."}]}',
 '{"links": [{"title": "Deployment Guide", "url": "#"}, {"title": "Marketing Resources", "url": "#"}]}',
 true);

-- Insert sample assignments
INSERT INTO assignments (lesson_id, title, instructions, due_date)
SELECT 
    l.id,
    CASE l.week
        WHEN 1 THEN 'Tool Research Assignment'
        WHEN 2 THEN 'Build Your First MVP'
        WHEN 3 THEN 'Database Integration Project'
        WHEN 4 THEN 'Create an Automation Workflow'
        WHEN 5 THEN 'Launch Your Product'
    END,
    CASE l.week
        WHEN 1 THEN 'Research and document 3 no-code tools that could be useful for your project idea.'
        WHEN 2 THEN 'Build a simple MVP using Lovable. Focus on core functionality and clean UI.'
        WHEN 3 THEN 'Integrate your app with a database using Supabase. Implement CRUD operations.'
        WHEN 4 THEN 'Create an automation workflow using n8n that enhances your application.'
        WHEN 5 THEN 'Deploy your application and create a launch plan with marketing strategy.'
    END,
    CURRENT_DATE + INTERVAL '7 days' * l.week
FROM lessons l;