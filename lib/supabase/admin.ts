import { createClient } from '@supabase/supabase-js';

export function createAdminSupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : process.env.SUPABASE_URL || 'https://kvkeosqhynawqhxlbfwt.supabase.co';

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is missing from environment variables.');
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
