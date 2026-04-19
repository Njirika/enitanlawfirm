import { eq } from "drizzle-orm";
import { db } from "../lib/db";
import { adminUsersTable } from "../schema/admin_users";
import type { InsertAdminUser } from "../schema/admin_users";

export const AuthService = {
  /**
   * Find an admin user by email
   */
  async findUserByEmail(email: string) {
    const [user] = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.email, email));
    return user || null;
  },

  /**
   * Find the first admin user in the system
   */
  async findFirstAdmin() {
    const [user] = await db
      .select()
      .from(adminUsersTable)
      .limit(1);
    return user || null;
  },

  /**
   * Find an admin user by ID
   */
  async findUserById(id: number) {
    const [user] = await db
      .select()
      .from(adminUsersTable)
      .where(eq(adminUsersTable.id, id));
    return user || null;
  },

  /**
   * Create an admin user (Initial setup only)
   */
  async createAdminUser(data: InsertAdminUser) {
    const [user] = await db
      .insert(adminUsersTable)
      .values(data)
      .returning();
    return user;
  },

  /**
   * Update an admin user
   */
  async updateAdminUser(id: number, data: Partial<InsertAdminUser>) {
    const [user] = await db
      .update(adminUsersTable)
      .set(data)
      .where(eq(adminUsersTable.id, id))
      .returning();
    return user || null;
  }
};
