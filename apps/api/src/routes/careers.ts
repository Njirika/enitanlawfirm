import { Router, type Request, type Response } from "express";
import { CareerService } from "@workspace/db";
import {
  SubmitCareerApplicationBody,
  ListCareerApplicationsQueryParams,
  GetCareerApplicationParams,
  UpdateCareerApplicationParams,
  UpdateCareerApplicationBody,
} from "@workspace/api-zod";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const parsed = SubmitCareerApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const created = await CareerService.submitApplication({
    ...parsed.data,
    phone: parsed.data.phone ?? null,
    position: parsed.data.position ?? null,
    cvUrl: parsed.data.cvUrl ?? null,
  });

  res.status(201).json({
    ...created,
    phone: created.phone ?? undefined,
    position: created.position ?? undefined,
    cvUrl: created.cvUrl ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.get("/applications", async (req: Request, res: Response) => {
  const parsed = ListCareerApplicationsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 20) : 20;

  const [items, total] = await Promise.all([
    CareerService.listApplications({ page, limit }),
    CareerService.countApplications(),
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

router.get("/applications/:id", async (req: Request, res: Response) => {
  const parsed = GetCareerApplicationParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  const app = await CareerService.getApplicationById(parsed.data.id);

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

router.patch("/applications/:id", async (req: Request, res: Response) => {
  const paramsParsed = UpdateCareerApplicationParams.safeParse({ id: Number(req.params.id) });
  const bodyParsed = UpdateCareerApplicationBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  if (!bodyParsed.data.status) {
    res.status(400).json({ error: "Status is required" });
    return;
  }

  const updated = await CareerService.updateStatus(paramsParsed.data.id, bodyParsed.data.status);

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
