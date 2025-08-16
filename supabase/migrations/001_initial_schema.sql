-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE submission_status AS ENUM ('submitted', 'reviewed', 'needs_changes');

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name text,
    email text UNIQUE NOT NULL,
    role user_role DEFAULT 'student' NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Cohorts table
CREATE TABLE cohorts (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    start_date date,
    end_date date,
    is_active boolean DEFAULT true
);

-- Enrollments table
CREATE TABLE enrollments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    cohort_id uuid REFERENCES cohorts(id) ON DELETE CASCADE NOT NULL,
    payment_status payment_status DEFAULT 'pending' NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(user_id, cohort_id)
);

-- Lessons table
CREATE TABLE lessons (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    week integer NOT NULL,
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    summary text,
    content jsonb,
    resources jsonb,
    visible boolean DEFAULT true
);

-- Assignments table
CREATE TABLE assignments (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    instructions text NOT NULL,
    due_date date
);

-- Submissions table
CREATE TABLE submissions (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id uuid REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    url text,
    notes text,
    status submission_status DEFAULT 'submitted' NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    UNIQUE(assignment_id, user_id)
);

-- Announcements table
CREATE TABLE announcements (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    cohort_id uuid REFERENCES cohorts(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Leads table
CREATE TABLE leads (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    note text,
    source text,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all enrollments" ON enrollments FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Lessons policies
CREATE POLICY "Everyone can view visible lessons" ON lessons FOR SELECT USING (visible = true);
CREATE POLICY "Admins can manage all lessons" ON lessons FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Assignments policies
CREATE POLICY "Everyone can view assignments for visible lessons" ON assignments FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM lessons 
        WHERE lessons.id = assignments.lesson_id AND lessons.visible = true
    )
);
CREATE POLICY "Admins can manage all assignments" ON assignments FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Submissions policies
CREATE POLICY "Users can view their own submissions" ON submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own submissions" ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own submissions" ON submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all submissions" ON submissions FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Announcements policies
CREATE POLICY "Enrolled users can view announcements" ON announcements FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM enrollments 
        WHERE enrollments.cohort_id = announcements.cohort_id 
        AND enrollments.user_id = auth.uid()
    )
);
CREATE POLICY "Admins can manage all announcements" ON announcements FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Cohorts policies
CREATE POLICY "Everyone can view active cohorts" ON cohorts FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage all cohorts" ON cohorts FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Leads policies (admin only)
CREATE POLICY "Admins can manage all leads" ON leads FOR ALL USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Functions and triggers
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to auto-enroll users in active cohort
CREATE OR REPLACE FUNCTION auto_enroll_user()
RETURNS TRIGGER AS $$
DECLARE
    active_cohort_id uuid;
BEGIN
    -- Get the first active cohort
    SELECT id INTO active_cohort_id 
    FROM cohorts 
    WHERE is_active = true 
    LIMIT 1;
    
    -- If there's an active cohort, enroll the user
    IF active_cohort_id IS NOT NULL THEN
        INSERT INTO enrollments (user_id, cohort_id, payment_status)
        VALUES (NEW.id, active_cohort_id, 'pending');
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-enroll new users
CREATE TRIGGER on_profile_created
    AFTER INSERT ON profiles
    FOR EACH ROW EXECUTE FUNCTION auto_enroll_user();