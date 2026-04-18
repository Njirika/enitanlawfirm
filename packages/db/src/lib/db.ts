import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "../schema";

const { Pool } = pg;

export const getDb = (connectionString?: string) => {
  const url = connectionString || process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provide a connection string?",
    );
  }

  const pool = new Pool({ connectionString: url });
  return drizzle(pool, { schema });
};

// Singleton for easy use on server
export const db = getDb();
