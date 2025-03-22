export interface TestSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  total_tests: number;
  duration: string;
  thumbnail: string;
  created_at: string;
}

export interface Question {
  id: string;
  test_series_id: string;
  text: string;
  options: string[];
  correct_answer: number;
  has_formulas?: boolean;
  language?: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  test_series_id: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unattempted: number;
  time_taken: string;
  created_at: string;
  test_series?: TestSeries;
}

export interface UserProgress {
  user_id: string;
  test_series_id: string;
  progress: number;
  last_question_index: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}
