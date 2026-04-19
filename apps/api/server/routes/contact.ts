import { Router, Request, Response } from "express";
import { ContactService } from "@workspace/db";
import {
  SubmitContactBody,
  ListContactMessagesQueryParams,
  GetContactMessageParams,
  UpdateContactMessageParams,
  UpdateContactMessageBody,
} from "@workspace/api-zod";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const created = await ContactService.submitMessage({
    ...parsed.data,
    phone: parsed.data.phone ?? null,
  });

  res.status(201).json({
    ...created,
    phone: created.phone ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.get("/messages", async (req: Request, res: Response) => {
  const parsed = ListContactMessagesQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;

  const [items, total] = await Promise.all([
    ContactService.listMessages({ page, limit }),
    ContactService.countMessages(),
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

router.get("/messages/:id", async (req: Request, res: Response) => {
  const parsed = GetContactMessageParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const msg = await ContactService.getMessageById(parsed.data.id);

  if (!msg) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ ...msg, phone: msg.phone ?? undefined, createdAt: msg.createdAt.toISOString() });
});

router.patch("/messages/:id", async (req: Request, res: Response) => {
  const paramsParsed = UpdateContactMessageParams.safeParse({ id: Number(req.params.id) });
  const bodyParsed = UpdateContactMessageBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  if (!bodyParsed.data.status) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  const updated = await ContactService.updateStatus(paramsParsed.data.id, bodyParsed.data.status);

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({ ...updated, phone: updated.phone ?? undefined, createdAt: updated.createdAt.toISOString() });
});

export default router;
