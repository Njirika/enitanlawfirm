import { eq, desc, and, count } from "drizzle-orm";
import { db } from "../lib/db";
import { blogPostsTable } from "../schema/blog_posts";
import type { InsertBlogPost, BlogPost } from "../schema/blog_posts";

export const BlogService = {
  /**
   * List all blog posts with pagination
   */
  async listPosts(options: { page?: number; limit?: number; publishedOnly?: boolean } = {}) {
    const { page = 1, limit = 10, publishedOnly = false } = options;
    const offset = (page - 1) * limit;

    const query = db
      .select()
      .from(blogPostsTable);

    if (publishedOnly) {
      query.where(eq(blogPostsTable.published, true));
    }

    return query
      .orderBy(desc(blogPostsTable.createdAt))
      .limit(limit)
      .offset(offset);
  },

  /**
   * Get a single post by slug
   */
  async getPostBySlug(slug: string) {
    const [post] = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug));
    return post || null;
  },

  /**
   * Create a new post
   */
  async createPost(data: InsertBlogPost) {
    const [post] = await db
      .insert(blogPostsTable)
      .values(data)
      .returning();
    return post;
  },

  /**
   * Update an existing post
   */
  async updatePost(slug: string, data: Partial<InsertBlogPost>) {
    const [post] = await db
      .update(blogPostsTable)
      .set(data)
      .where(eq(blogPostsTable.slug, slug))
      .returning();
    return post || null;
  },

  /**
   * Delete a post
   */
  async deletePost(slug: string) {
    const [post] = await db
      .delete(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .returning();
    return post || null;
  },

  /**
   * Count total posts
   */
  async countPosts(options: { publishedOnly?: boolean } = {}) {
    const { publishedOnly = false } = options;
    
    const [result] = await db
      .select({ count: count() })
      .from(blogPostsTable)
      .where(publishedOnly ? eq(blogPostsTable.published, true) : undefined);
    
    return result?.count ?? 0;
  },

  /**
   * List all unique categories
   */
  async listCategories(publishedOnly = true) {
    const results = await db
      .selectDistinct({ category: blogPostsTable.category })
      .from(blogPostsTable)
      .where(publishedOnly ? eq(blogPostsTable.published, true) : undefined);
    return results.map(r => r.category).filter((c): c is string => c !== null);
  }
};
