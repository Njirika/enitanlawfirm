import { Router } from "express";
import { AuthService, BlogService, ContactService, CareerService } from "@workspace/db";
import { verifyPassword } from "../lib/auth.js";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

router.post("/login", async (req, res) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const { email, password } = parsed.data;
  const user = await AuthService.findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  (req.session as unknown as Record<string, unknown>).adminUserId = user.id;

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
  const adminUserId = (req.session as unknown as Record<string, unknown>).adminUserId as number | undefined;
  if (!adminUserId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const user = await AuthService.findUserById(adminUserId);

  if (!user) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  res.json({ id: user.id, email: user.email, name: user.name });
});

router.get("/stats", async (req, res) => {
  const [
    totalMessages,
    newMessages,
    totalApplications,
    newApplications,
    totalBlogPosts,
    publishedBlogPosts,
  ] = await Promise.all([
    ContactService.countMessages(),
    ContactService.countMessages("new"),
    CareerService.countApplications(),
    CareerService.countApplications("new"),
    BlogService.countPosts(),
    BlogService.countPosts({ publishedOnly: true }),
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

export default router;
