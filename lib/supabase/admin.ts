import { createClient } from '@supabase/supabase-js';

export function createAdminSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : 'https://kvkeosqhynawqhxlbfwt.supabase.co';

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.SUPABASE_SERVICE_ROLE_KEY !== 'placeholder-service-role-key'
      ? process.env.SUPABASE_SERVICE_ROLE_KEY
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2a2Vvc3FoeW5hd3FoeGxiZnd0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY3Nzk4NCwiZXhwIjoyMTAyMjUzOTg0fQ.OkpDfBFdiZCuw7iaqmMf6VIT6jGU2O79PjwMtLF1FTc';

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
