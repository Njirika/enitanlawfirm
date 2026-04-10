import { Router } from "express";
import { db } from "@workspace/db";
import { adminUsersTable, blogPostsTable, contactMessagesTable, careerApplicationsTable } from "@workspace/db";
import { eq, count } from "drizzle-orm";
import { hashPassword, verifyPassword } from "../lib/auth.js";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

router.post("/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const { email, password } = parsed.data;
  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.email, email));

  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  (req.session as Record<string, unknown>).adminUserId = user.id;

  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/me", async (req, res) => {
  const adminUserId = (req.session as Record<string, unknown>).adminUserId as number | undefined;
  if (!adminUserId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const [user] = await db
    .select()
    .from(adminUsersTable)
    .where(eq(adminUsersTable.id, adminUserId));

  if (!user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  res.json({ id: user.id, email: user.email, name: user.name });
});

router.get("/stats", async (req, res) => {
  const [
    [{ total: totalMessages }],
    [{ total: newMessages }],
    [{ total: totalApplications }],
    [{ total: newApplications }],
    [{ total: totalBlogPosts }],
    [{ total: publishedBlogPosts }],
  ] = await Promise.all([
    db.select({ total: count() }).from(contactMessagesTable),
    db.select({ total: count() }).from(contactMessagesTable).where(eq(contactMessagesTable.status, "new")),
    db.select({ total: count() }).from(careerApplicationsTable),
    db.select({ total: count() }).from(careerApplicationsTable).where(eq(careerApplicationsTable.status, "new")),
    db.select({ total: count() }).from(blogPostsTable),
    db.select({ total: count() }).from(blogPostsTable).where(eq(blogPostsTable.published, true)),
  ]);

  res.json({
    totalMessages,
    newMessages,
    totalApplications,
    newApplications,
    totalBlogPosts,
    publishedBlogPosts,
  });
});

export { hashPassword };
export default router;
