-- Create test_series table if it doesn't exist
CREATE TABLE IF NOT EXISTS test_series (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  total_tests INTEGER NOT NULL,
  duration TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE test_series ENABLE ROW LEVEL SECURITY;

-- Create policy for public access
DROP POLICY IF EXISTS "Public test_series access" ON test_series;
CREATE POLICY "Public test_series access"
ON test_series FOR SELECT
USING (true);

-- Insert sample test series data
INSERT INTO test_series (id, title, description, category, total_tests, duration, thumbnail, created_at)
VALUES 
('test-series-1', 'UPSC Civil Services (हिंदी)', 'Comprehensive test series for UPSC Civil Services Examination with topic-wise and full-length mock tests in Hindi.', 'Government Exams', 25, '120 hours', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80', NOW()),
('test-series-2', 'NEET Medical Entrance', 'Complete preparation for NEET with subject-wise tests, previous year papers, and full mock tests.', 'Medical', 30, '90 hours', 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&q=80', NOW()),
('test-series-3', 'JEE Advanced (Formulas)', 'Rigorous test series for JEE Advanced covering Physics, Chemistry, and Mathematics with detailed solutions and formula-based questions.', 'Engineering', 20, '100 hours', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80', NOW()),
('test-series-4', 'Bank PO & Clerk', 'Comprehensive test series for banking exams including reasoning, quantitative aptitude, and English.', 'Banking', 15, '60 hours', 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=500&q=80', NOW()),
('test-series-5', 'GATE Computer Science', 'Topic-wise and full-length tests for GATE CSE with detailed explanations and performance analytics.', 'Engineering', 22, '110 hours', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80', NOW()),
('test-series-6', 'SSC Combined Graduate Level', 'Complete test package for SSC CGL with tier-wise mock tests and previous year question papers.', 'Government Exams', 18, '75 hours', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&q=80', NOW());

-- Enable realtime for test_series table
alter publication supabase_realtime add table test_series;