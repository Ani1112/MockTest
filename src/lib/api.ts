import { supabase } from "./supabase";

// Test Series API
export const testSeriesApi = {
  // Get all test series
  getAllTestSeries: async () => {
    const { data, error } = await supabase.from("test_series").select("*");

    if (error) throw error;
    return data;
  },

  // Get a single test series by ID
  getTestSeriesById: async (id: string) => {
    const { data, error } = await supabase
      .from("test_series")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Get all questions for a test series
  getTestSeriesQuestions: async (testSeriesId: string) => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .eq("test_series_id", testSeriesId);

    if (error) throw error;
    return data;
  },

  // Save test result
  saveTestResult: async (result: {
    user_id: string;
    test_series_id: string;
    score: number;
    total_questions: number;
    correct_answers: number;
    incorrect_answers: number;
    unattempted: number;
    time_taken: string;
  }) => {
    const { data, error } = await supabase
      .from("test_results")
      .insert(result)
      .select();

    if (error) throw error;
    return data;
  },

  // Get user's test results
  getUserTestResults: async (userId: string) => {
    const { data, error } = await supabase
      .from("test_results")
      .select("*, test_series:test_series_id(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },
};

// User API
export const userApi = {
  // Get current user
  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Sign up
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign in
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
