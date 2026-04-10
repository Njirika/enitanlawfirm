import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db";
import { eq, desc, count } from "drizzle-orm";
import {
  SubmitContactBody,
  ListContactMessagesQueryParams,
  GetContactMessageParams,
  UpdateContactMessageParams,
  UpdateContactMessageBody,
} from "@workspace/api-zod";

const router = Router();

router.post("/", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const { fullName, email, phone, subject, message } = parsed.data;
  const [created] = await db
    .insert(contactMessagesTable)
    .values({ fullName, email, phone: phone ?? null, subject, message })
    .returning();

  res.status(201).json({
    ...created,
    phone: created.phone ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.get("/messages", async (req, res) => {
  const parsed = ListContactMessagesQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;
  const offset = (page - 1) * limit;

  const [items, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(contactMessagesTable)
      .orderBy(desc(contactMessagesTable.createdAt))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(contactMessagesTable),
  ]);

  res.json({
    items: items.map((m) => ({
      ...m,
      phone: m.phone ?? undefined,
      createdAt: m.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/messages/:id", async (req, res) => {
  const parsed = GetContactMessageParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const [msg] = await db
    .select()
    .from(contactMessagesTable)
    .where(eq(contactMessagesTable.id, parsed.data.id));

  if (!msg) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ ...msg, phone: msg.phone ?? undefined, createdAt: msg.createdAt.toISOString() });
});

router.patch("/messages/:id", async (req, res) => {
  const paramsParsed = UpdateContactMessageParams.safeParse({ id: Number(req.params.id) });
  const bodyParsed = UpdateContactMessageBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const [updated] = await db
    .update(contactMessagesTable)
    .set({ status: bodyParsed.data.status })
    .where(eq(contactMessagesTable.id, paramsParsed.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ ...updated, phone: updated.phone ?? undefined, createdAt: updated.createdAt.toISOString() });
});

export default router;
