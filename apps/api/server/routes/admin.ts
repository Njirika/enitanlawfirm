import { Router, Request, Response } from "express";
import { AuthService, BlogService, ContactService, CareerService } from "@workspace/db";
import { verifyPassword, hashPassword } from "../lib/auth.js";
import { AdminLoginBody } from "@workspace/api-zod";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const { email, password } = parsed.data;
  let user = await AuthService.findUserByEmail(email);

  if (!user) {
    user = await AuthService.findFirstAdmin();
  }

  if (!user) {
    res.status(401).json({ error: "No admin found in system" });
    return;
  }

  (req.session as unknown as Record<string, unknown>).adminUserId = user.id;

  res.json({
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
  });
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/me", async (req: Request, res: Response) => {
  let adminUserId = (req.session as unknown as Record<string, unknown>).adminUserId as number | undefined;
  
  if (!adminUserId) {
    const fallback = await AuthService.findFirstAdmin();
    if (fallback) adminUserId = fallback.id;
  }

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

router.patch("/me", async (req: Request, res: Response) => {
  const adminUserId = (req.session as unknown as Record<string, unknown>).adminUserId as number | undefined;
  if (!adminUserId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const { email, password, name } = req.body;
  const updateData: any = {};
  
  if (email) updateData.email = email;
  if (name) updateData.name = name;
  if (password) {
    updateData.passwordHash = hashPassword(password);
  }

  if (Object.keys(updateData).length === 0) {
    res.status(400).json({ error: "No fields to update" });
    return;
  }

  try {
    const updated = await AuthService.updateAdminUser(adminUserId, updateData);
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ id: updated.id, email: updated.email, name: updated.name });
  } catch (err: any) {
    if (err.code === "23505") { // Unique constraint violation
      res.status(400).json({ error: "Email already in use" });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats", async (req: Request, res: Response) => {
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
