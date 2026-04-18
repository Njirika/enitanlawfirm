import app from "./app.js";
import { logger } from "./lib/logger.js";
import { validateEnv, config } from "./config.js";

// Ensure all required environment variables are present
validateEnv();

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
