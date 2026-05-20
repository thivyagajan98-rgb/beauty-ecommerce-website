import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client is OPTIONAL.
 * - When NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY are set, this returns a real client.
 * - Otherwise, returns null and the app falls back to local mock data.
 *
 * See `supabase/schema.sql` for the database schema.
 */
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key, {
    auth: { persistSession: false }
  });
  return _client;
}

export const supabaseEnabled = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
