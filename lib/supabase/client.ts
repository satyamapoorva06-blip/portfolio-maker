import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
        ? process.env.NEXT_PUBLIC_SUPABASE_URL
        : "https://kvkeosqhynawqhxlbfwt.supabase.co";

    const supabaseAnonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "placeholder-anon-key" &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "sb_publishable_jE_wtyTsrxbzKhRdCBhNKQ_-Kx8uheV"
        ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2a2Vvc3FoeW5hd3FoeGxiZnd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY3Nzk4NCwiZXhwIjoyMTAyMjUzOTg0fQ.OkpDfBFdiZCuw7iaqmMf6VIT6jGU2O79PjwMtLF1FTc";

    return createBrowserClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn("Supabase client creation fallback:", e);
    return null;
  }
}
