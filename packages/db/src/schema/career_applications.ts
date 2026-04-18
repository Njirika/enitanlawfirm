import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const careerStatusEnum = pgEnum("career_status", ["new", "reviewing", "shortlisted", "rejected"]);

export const careerApplicationsTable = pgTable("career_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  position: text("position"),
  coverNote: text("cover_note").notNull(),
  cvUrl: text("cv_url"),
  status: careerStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCareerApplicationSchema = createInsertSchema(careerApplicationsTable).omit({ id: true, createdAt: true, status: true });
export type InsertCareerApplication = z.infer<typeof insertCareerApplicationSchema>;
export type CareerApplication = typeof careerApplicationsTable.$inferSelect;
