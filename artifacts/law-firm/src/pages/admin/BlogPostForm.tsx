import { useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetBlogPost,
  useCreateBlogPost,
  useUpdateBlogPost,
  getGetBlogPostQueryKey,
  getListBlogPostsQueryKey
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(10, "Excerpt is required"),
  content: z.string().min(20, "Content is required"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  published: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogPostForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/blog/edit/:slug");
  const isEditing = !!params?.slug;
  const slug = params?.slug || "";

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const { data: post, isLoading } = useGetBlogPost(slug, {
    query: { enabled: isEditing, queryKey: getGetBlogPostQueryKey(slug) }
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      author: "Enitan Afolabi & Co.",
      featuredImage: "",
      published: false,
    },
  });

  // Auto-generate slug from title if not editing and slug is empty
  const titleValue = form.watch("title");
  useEffect(() => {
    if (!isEditing && titleValue && !form.formState.dirtyFields.slug) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      form.setValue("slug", generatedSlug);
    }
  }, [titleValue, isEditing, form]);

  // Load existing data
  useEffect(() => {
    if (post && isEditing) {
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        featuredImage: post.featuredImage || "",
        published: post.published,
      });
    }
  }, [post, isEditing, form]);

  const onSubmit = (data: FormValues) => {
    if (isEditing && post) {
      updateMutation.mutate(
        { id: post.id, data },
        {
          onSuccess: () => {
            toast({ title: "Post updated successfully" });
            queryClient.invalidateQueries({ queryKey: getGetBlogPostQueryKey(data.slug) });
            queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
            if (data.slug !== slug) {
              setLocation(`/admin/blog/edit/${data.slug}`);
            }
          },
          onError: () => toast({ variant: "destructive", title: "Failed to update post" })
        }
      );
    } else {
      createMutation.mutate(
        { data },
        {
          onSuccess: () => {
            toast({ title: "Post created successfully" });
            queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
            setLocation("/admin/blog");
          },
          onError: () => toast({ variant: "destructive", title: "Failed to create post" })
        }
      );
    }
  };

  if (isEditing && isLoading) return <div className="p-8">Loading post...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => setLocation("/admin/blog")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-1">
            {isEditing ? "Edit Blog Post" : "New Blog Post"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing ? "Update the details of your article." : "Write a new article for your website."}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-6">
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Post Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Navigating Corporate Finance in Nigeria" className="text-lg h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="navigating-corporate-finance" {...field} />
                    </FormControl>
                    <FormDescription>The URL-friendly version of the title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Corporate Law" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featuredImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt / Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A short 1-2 sentence summary of the article..." 
                      className="h-20 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>This appears on the blog listing page and as the intro in the article.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content (HTML supported)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write your article content here... HTML tags like <p>, <h2>, <strong> are supported." 
                      className="min-h-[400px] font-mono text-sm" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 border-t border-border">
              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Publish Status</FormLabel>
                      <FormDescription>
                        When published, the post will be visible on the public website.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setLocation("/admin/blog")}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="px-8"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEditing ? "Save Changes" : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
