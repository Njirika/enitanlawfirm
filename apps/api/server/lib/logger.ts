import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";

// Simple console-based logger for production to avoid pino worker-thread issues on Vercel
const consoleLogger = {
  info: (obj: any, msg?: string) => console.log(JSON.stringify({ level: "info", ...obj, msg })),
  error: (obj: any, msg?: string) => console.error(JSON.stringify({ level: "error", ...obj, msg })),
  warn: (obj: any, msg?: string) => console.warn(JSON.stringify({ level: "warn", ...obj, msg })),
  debug: (obj: any, msg?: string) => console.debug(JSON.stringify({ level: "debug", ...obj, msg })),
  child: () => consoleLogger,
  levels: {
    values: { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 },
    labels: { 10: "trace", 20: "debug", 30: "info", 40: "warn", 50: "error", 60: "fatal" },
  },
};

export const logger = isProduction ? (consoleLogger as any) : pino({
  level: process.env.LOG_LEVEL ?? "info",
  // In development, we use pino-pretty
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
});
