import { Router } from "express";
import { db } from "@workspace/db";
import { blogPostsTable } from "@workspace/db";
import { eq, desc, count, ilike, and, sql } from "drizzle-orm";
import {
  ListBlogPostsQueryParams,
  GetBlogPostParams,
  CreateBlogPostBody,
  UpdateBlogPostParams,
  UpdateBlogPostBody,
  DeleteBlogPostParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = ListBlogPostsQueryParams.safeParse(req.query);
  const page = parsed.success ? (parsed.data.page ?? 1) : 1;
  const limit = parsed.success ? (parsed.data.limit ?? 9) : 9;
  const category = parsed.success ? parsed.data.category : undefined;
  const search = parsed.success ? parsed.data.search : undefined;
  const offset = (page - 1) * limit;

  const conditions = [eq(blogPostsTable.published, true)];

  if (category) {
    conditions.push(eq(blogPostsTable.category, category));
  }

  if (search) {
    conditions.push(
      sql`(${ilike(blogPostsTable.title, `%${search}%`)} OR ${ilike(blogPostsTable.excerpt, `%${search}%`)})`
    );
  }

  const whereClause = and(...conditions);

  const [items, [{ value: total }]] = await Promise.all([
    db
      .select()
      .from(blogPostsTable)
      .where(whereClause)
      .orderBy(desc(blogPostsTable.publishedAt))
      .limit(limit)
      .offset(offset),
    db.select({ value: count() }).from(blogPostsTable).where(whereClause),
  ]);

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

router.get("/categories", async (req, res) => {
  const results = await db
    .selectDistinct({ category: blogPostsTable.category })
    .from(blogPostsTable)
    .where(eq(blogPostsTable.published, true));

  res.json({ categories: results.map((r) => r.category) });
});

router.get("/:slug", async (req, res) => {
  const parsed = GetBlogPostParams.safeParse({ slug: req.params.slug });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.slug, parsed.data.slug));

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

router.post("/", async (req, res) => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const { slug, title, excerpt, content, category, author, featuredImage, published } = parsed.data;

  const [created] = await db
    .insert(blogPostsTable)
    .values({
      slug,
      title,
      excerpt,
      content,
      category,
      author,
      featuredImage: featuredImage ?? null,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
    })
    .returning();

  res.status(201).json({
    ...created,
    featuredImage: created.featuredImage ?? undefined,
    publishedAt: created.publishedAt?.toISOString() ?? undefined,
    createdAt: created.createdAt.toISOString(),
  });
});

router.put("/:slug", async (req, res) => {
  const paramsParsed = UpdateBlogPostParams.safeParse({ slug: req.params.slug });
  const bodyParsed = UpdateBlogPostBody.safeParse(req.body);

  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }

  const { title, excerpt, content, category, author, featuredImage, published } = bodyParsed.data;

  const updateData: Record<string, unknown> = {};
  if (title !== undefined) updateData.title = title;
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (content !== undefined) updateData.content = content;
  if (category !== undefined) updateData.category = category;
  if (author !== undefined) updateData.author = author;
  if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
  if (published !== undefined) {
    updateData.published = published;
    if (published) updateData.publishedAt = new Date();
  }

  const [updated] = await db
    .update(blogPostsTable)
    .set(updateData)
    .where(eq(blogPostsTable.slug, paramsParsed.data.slug))
    .returning();

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

router.delete("/:slug", async (req, res) => {
  const parsed = DeleteBlogPostParams.safeParse({ slug: req.params.slug });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid slug" });
    return;
  }

  await db.delete(blogPostsTable).where(eq(blogPostsTable.slug, parsed.data.slug));
  res.status(204).send();
});

export default router;
