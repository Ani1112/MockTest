import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";
import { TestResult } from "@/types/api";

export function useTestResults() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("test_results")
          .select("*, test_series:test_series_id(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error("Error fetching test results:", err);
        setError("Failed to load test results");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  return { results, isLoading, error };
}
