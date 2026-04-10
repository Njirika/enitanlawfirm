import { Router } from "express";
import { db } from "@workspace/db";
import { careerApplicationsTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import {
  SubmitCareerApplicationBody,
  ListCareerApplicationsQueryParams,
  GetCareerApplicationParams,
  UpdateCareerApplicationParams,
  UpdateCareerApplicationBody,
} from "@workspace/api-zod";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = SubmitCareerApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const { fullName, email, phone, position, coverNote, cvUrl } = parsed.data;
  const [created] = await db
    .insert(careerApplicationsTable)
    .values({
      fullName,
      email,
      phone: phone ?? null,
      position: position ?? null,
      coverNote,
      cvUrl: cvUrl ?? null,
    })
    .returning();

  res.status(201).json({
    ...created,
    phone: created.phone ?? undefined,
    position: created.position ?? undefined,
    cvUrl: created.cvUrl ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.get("/applications", async (req, res) => {
  const parsed = ListCareerApplicationsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
  const offset = (page - 1) * limit;

  const [items, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(careerApplicationsTable)
      .orderBy(desc(careerApplicationsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(careerApplicationsTable),
  ]);

  res.json({
    items: items.map((a) => ({
      ...a,
      phone: a.phone ?? undefined,
      position: a.position ?? undefined,
      cvUrl: a.cvUrl ?? undefined,
      createdAt: a.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/applications/:id", async (req, res) => {
  const parsed = GetCareerApplicationParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [app] = await db
    .select()
    .from(careerApplicationsTable)
    .where(eq(careerApplicationsTable.id, parsed.data.id));

  if (!app) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    ...app,
    phone: app.phone ?? undefined,
    position: app.position ?? undefined,
    cvUrl: app.cvUrl ?? undefined,
    createdAt: app.createdAt.toISOString(),
  });
});

router.patch("/applications/:id", async (req, res) => {
  const paramsParsed = UpdateCareerApplicationParams.safeParse({ id: Number(req.params.id) });
  const bodyParsed = UpdateCareerApplicationBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const [updated] = await db
    .update(careerApplicationsTable)
    .set({ status: bodyParsed.data.status })
    .where(eq(careerApplicationsTable.id, paramsParsed.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    ...updated,
    phone: updated.phone ?? undefined,
    position: updated.position ?? undefined,
    cvUrl: updated.cvUrl ?? undefined,
    createdAt: updated.createdAt.toISOString(),
  });
});

export default router;
