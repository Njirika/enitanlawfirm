import { eq, desc, count } from "drizzle-orm";
import { db } from "../lib/db";
import { contactMessagesTable } from "../schema/contact_messages";
import type { InsertContactMessage } from "../schema/contact_messages";

export const ContactService = {
  /**
   * Submit a new contact message
   */
  async submitMessage(data: InsertContactMessage) {
    const [message] = await db
      .insert(contactMessagesTable)
      .values(data)
      .returning();
    return message;
  },

  /**
   * List contact messages with pagination
   */
  async listMessages(options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 50 } = options;
    const offset = (page - 1) * limit;

    return db
      .select()
      .from(contactMessagesTable)
      .orderBy(desc(contactMessagesTable.createdAt))
      .limit(limit)
      .offset(offset);
  },

  /**
   * Update message status
   */
  async updateStatus(id: number, status: "new" | "read" | "replied") {
    const [message] = await db
      .update(contactMessagesTable)
      .set({ status })
      .where(eq(contactMessagesTable.id, id))
      .returning();
    return message || null;
  },

  /**
   * Delete a message
   */
  async deleteMessage(id: number) {
    const [message] = await db
      .delete(contactMessagesTable)
      .where(eq(contactMessagesTable.id, id))
      .returning();
    return message || null;
  },

  /**
   * Count messages
   */
  async countMessages(status?: "new" | "read" | "replied") {
    const [result] = await db
      .select({ count: count() })
      .from(contactMessagesTable)
      .where(status ? eq(contactMessagesTable.status, status) : undefined);
    return result?.count ?? 0;
  },

  /**
   * Get a single message by ID
   */
  async getMessageById(id: number) {
    const [message] = await db
      .select()
      .from(contactMessagesTable)
      .where(eq(contactMessagesTable.id, id));
    return message || null;
  }
};
