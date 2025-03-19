import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/components/auth/AuthProvider";

export function useUserProgress(testSeriesId?: string) {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !testSeriesId) {
      setIsLoading(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("user_progress")
          .select("progress")
          .eq("user_id", user.id)
          .eq("test_series_id", testSeriesId)
          .single();

        if (error) throw error;
        setProgress(data?.progress || 0);
      } catch (err) {
        console.error("Error fetching user progress:", err);
        setError("Failed to load progress");
        setProgress(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [user, testSeriesId]);

  const updateProgress = async (newProgress: number) => {
    if (!user || !testSeriesId) return;

    try {
      const { error } = await supabase.from("user_progress").upsert({
        user_id: user.id,
        test_series_id: testSeriesId,
        progress: newProgress,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      setProgress(newProgress);
    } catch (err) {
      console.error("Error updating progress:", err);
      throw err;
    }
  };

  return { progress, isLoading, error, updateProgress };
}
