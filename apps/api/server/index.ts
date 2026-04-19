import app from "./app.js";
import { logger } from "./lib/logger.js";
import { validateEnv, config } from "./config.js";

console.log("[SYSTEM] Starting Enitan API in serverless environment...");
console.log("[SYSTEM] Node version:", process.version);

// Ensure all required environment variables are present
try {
  validateEnv();
  console.log("[SYSTEM] Environment variables validated successfully.");
} catch (error) {
  console.error("[CRITICAL] Environment validation failed:", error.message);
  throw error; // Re-throw for Vercel logs
}

// Export for serverless environments (Vercel)
export default app;

if (!process.env.VERCEL) {
  const port = config.port;

  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}
