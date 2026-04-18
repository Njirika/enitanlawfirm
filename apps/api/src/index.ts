import app from "./app";
import { logger } from "./lib/logger";
import { validateEnv, config } from "./config";

// Ensure all required environment variables are present
validateEnv();

const port = config.port;

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
