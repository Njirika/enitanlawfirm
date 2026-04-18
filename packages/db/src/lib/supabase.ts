import { createClient } from "@supabase/supabase-js";

/**
 * SERVER-ONLY: Supabase Client with Service Role access.
 * NEVER expose this to the frontend.
 */
export const getSupabaseServiceRoleClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for service role client.");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

/**
 * PUBLIC: Supabase Client with Anon Key.
 */
export const getSupabaseAnonClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY.");
  }

  return createClient(url, key);
};
