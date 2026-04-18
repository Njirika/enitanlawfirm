/**
 * Backend Configuration & Environment Validation
 */

const requiredEnvVars = [
  "DATABASE_URL",
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SESSION_SECRET",
] as const;

export function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("\x1b[31m%s\x1b[0m", "ERROR: Missing required backend environment variables:");
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error("\x1b[33m%s\x1b[0m", "\nPlease check your .env file or deployment settings.\n");
    process.exit(1);
  }

  // Session Secret security check
  const secret = process.env.SESSION_SECRET;
  if (process.env.NODE_ENV === "production" && (!secret || secret.length < 32)) {
    console.warn("\x1b[33m%s\x1b[0m", "WARNING: SESSION_SECRET is too short for production. Minimum length is 32 characters.");
  }
}

export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL!,
  supabase: {
    url: process.env.SUPABASE_URL!,
    anonKey: process.env.SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  sessionSecret: process.env.SESSION_SECRET!,
  corsOrigin: process.env.CORS_ORIGIN 
    ? (process.env.CORS_ORIGIN.includes(",") ? process.env.CORS_ORIGIN.split(",").map(s => s.trim()) : process.env.CORS_ORIGIN)
    : true,
};
