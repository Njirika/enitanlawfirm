import session from "express-session";
import { db, sessionsTable } from "@workspace/db";
import { eq, lt } from "drizzle-orm";

export class DrizzleStore extends session.Store {
  constructor() {
    super();
    // Clean up expired sessions periodically (every 6 hours)
    setInterval(() => this.cleanup(), 6 * 60 * 60 * 1000);
  }

  async get(sid: string, callback: (err: any, session?: session.SessionData | null) => void) {
    try {
      const [record] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.sid, sid));

      if (!record || record.expire < new Date()) {
        return callback(null, null);
      }

      callback(null, record.sess as session.SessionData);
    } catch (err) {
      callback(err);
    }
  }

  async set(sid: string, sess: session.SessionData, callback?: (err?: any) => void) {
    try {
      const expire = sess.cookie.expires ? new Date(sess.cookie.expires) : new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      await db
        .insert(sessionsTable)
        .values({
          sid,
          sess,
          expire,
        })
        .onConflictDoUpdate({
          target: sessionsTable.sid,
          set: { sess, expire },
        });

      callback?.(null);
    } catch (err) {
      callback?.(err);
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      await db.delete(sessionsTable).where(eq(sessionsTable.sid, sid));
      callback?.(null);
    } catch (err) {
      callback?.(err);
    }
  }

  async touch(sid: string, sess: session.SessionData, callback?: (err?: any) => void) {
    try {
      const expire = sess.cookie.expires ? new Date(sess.cookie.expires) : new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      await db
        .update(sessionsTable)
        .set({ expire })
        .where(eq(sessionsTable.sid, sid));

      callback?.(null);
    } catch (err) {
      callback?.(err);
    }
  }

  private async cleanup() {
    try {
      await db.delete(sessionsTable).where(lt(sessionsTable.expire, new Date()));
      console.log("[SYSTEM] Expired sessions cleaned up.");
    } catch (err) {
      console.error("[CRITICAL ERROR] Failed to clean up expired sessions. Does the 'sessions' table exist?", err);
    }
  }
}
