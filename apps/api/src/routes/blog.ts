import { Router, type Request, type Response } from "express";
import { BlogService } from "@workspace/db";
import {
  ListBlogPostsQueryParams,
  GetBlogPostParams,
  CreateBlogPostBody,
  UpdateBlogPostParams,
  UpdateBlogPostBody,
  DeleteBlogPostParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const parsed = ListBlogPostsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 9) : 9;
  
  const items = await BlogService.listPosts({ 
    page, 
    limit, 
    publishedOnly: true 
  });
  
  const total = await BlogService.countPosts({ publishedOnly: true });

  res.json({
    items: items.map((p) => ({
      ...p,
      featuredImage: p.featuredImage ?? undefined,
      publishedAt: p.publishedAt?.toISOString() ?? undefined,
      createdAt: p.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
});

router.get("/categories", async (req: Request, res: Response) => {
  const categories = await BlogService.listCategories();
  res.json({ categories });
});

router.get("/:slug", async (req: Request, res: Response) => {
  const parsed = GetBlogPostParams.safeParse({ slug: req.params.slug });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  const post = await BlogService.getPostBySlug(parsed.data.slug);

  if (!post) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    ...post,
    featuredImage: post.featuredImage ?? undefined,
    publishedAt: post.publishedAt?.toISOString() ?? undefined,
    createdAt: post.createdAt.toISOString(),
  });
});

router.post("/", async (req: Request, res: Response) => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const created = await BlogService.createPost({
    ...parsed.data,
    featuredImage: parsed.data.featuredImage ?? null,
    published: parsed.data.published ?? false,
    publishedAt: parsed.data.published ? new Date() : null,
  });

  res.status(201).json({
    ...created,
    featuredImage: created.featuredImage ?? undefined,
    publishedAt: created.publishedAt?.toISOString() ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.put("/:slug", async (req: Request, res: Response) => {
  const paramsParsed = UpdateBlogPostParams.safeParse({ slug: req.params.slug });
  const bodyParsed = UpdateBlogPostBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const updated = await BlogService.updatePost(paramsParsed.data.slug, {
    ...bodyParsed.data,
    publishedAt: bodyParsed.data.published ? new Date() : undefined,
  });

  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }

  res.json({
    ...updated,
    featuredImage: updated.featuredImage ?? undefined,
    publishedAt: updated.publishedAt?.toISOString() ?? undefined,
    createdAt: updated.createdAt.toISOString(),
  });
});

router.delete("/:slug", async (req: Request, res: Response) => {
  const parsed = DeleteBlogPostParams.safeParse({ slug: req.params.slug });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  await BlogService.deletePost(parsed.data.slug);
  res.status(204).send();
});

export default router;
