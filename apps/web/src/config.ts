/**
 * Frontend Configuration & Environment Validation
 */

const requiredViteVars = [
  "VITE_API_URL",
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_ANON_KEY",
] as const;

export function validateEnv() {
  const missing = requiredViteVars.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    console.error("%cERROR: Missing required frontend environment variables:", "color: red; font-weight: bold;");
    missing.forEach((key) => console.error(`  - ${key}`));
  }
  
  return {
    isValid: missing.length === 0,
    missing
  };
}

export const config = {
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  isProd: import.meta.env.PROD,
  isDev: import.meta.env.DEV,
  basePath: import.meta.env.BASE_URL,
};
