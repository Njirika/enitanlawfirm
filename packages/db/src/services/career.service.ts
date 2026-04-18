import { eq, desc, count } from "drizzle-orm";
import { db } from "../lib/db";
import { careerApplicationsTable } from "../schema/career_applications";
import type { InsertCareerApplication } from "../schema/career_applications";

export const CareerService = {
  /**
   * Submit a new career application
   */
  async submitApplication(data: InsertCareerApplication) {
    const [application] = await db
      .insert(careerApplicationsTable)
      .values(data)
      .returning();
    return application;
  },

  /**
   * List career applications with pagination
   */
  async listApplications(options: { page?: number; limit?: number } = {}) {
    const { page = 1, limit = 50 } = options;
    const offset = (page - 1) * limit;

    return db
      .select()
      .from(careerApplicationsTable)
      .orderBy(desc(careerApplicationsTable.createdAt))
      .limit(limit)
      .offset(offset);
  },

  /**
   * Update application status
   */
  async updateStatus(id: number, status: "new" | "reviewing" | "shortlisted" | "rejected") {
    const [application] = await db
      .update(careerApplicationsTable)
      .set({ status })
      .where(eq(careerApplicationsTable.id, id))
      .returning();
    return application || null;
  },

  /**
   * Delete an application
   */
  async deleteApplication(id: number) {
    const [application] = await db
      .delete(careerApplicationsTable)
      .where(eq(careerApplicationsTable.id, id))
      .returning();
    return application || null;
  },

  /**
   * Count applications
   */
  async countApplications(status?: "new" | "reviewing" | "shortlisted" | "rejected") {
    const [result] = await db
      .select({ count: count() })
      .from(careerApplicationsTable)
      .where(status ? eq(careerApplicationsTable.status, status) : undefined);
    return result?.count ?? 0;
  },

  /**
   * Get a single application by ID
   */
  async getApplicationById(id: number) {
    const [application] = await db
      .select()
      .from(careerApplicationsTable)
      .where(eq(careerApplicationsTable.id, id));
    return application || null;
  }
};
