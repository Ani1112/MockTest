import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = "https://dsovzluhnbkbpikcxbfi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzb3Z6bHVobmJrYnBpa2N4YmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODAyNTMsImV4cCI6MjA1Nzk1NjI1M30.2BSg2P1WohutdzO25rGaAfsOTjnpPoGX_koqRRZ3LAI";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
