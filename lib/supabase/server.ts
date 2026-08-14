import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerSupabaseClient() {
  const cookieStore = cookies();

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'
      ? process.env.NEXT_PUBLIC_SUPABASE_URL
      : 'https://kvkeosqhynawqhxlbfwt.supabase.co';

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'placeholder-anon-key'
      ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      : 'sb_publishable_jE_wtyTsrxbzKhRdCBhNKQ_-Kx8uheV';

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Handled in Server Component context
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // Handled in Server Component context
        }
      },
    },
  });
}
