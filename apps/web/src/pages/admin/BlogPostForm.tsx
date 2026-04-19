import { useEffect } from "react";
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

interface BlogPostFormProps {
  slug?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BlogPostForm({ slug, onSuccess, onCancel }: BlogPostFormProps) {
  const isEditing = !!slug;
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const { data: post, isLoading } = useGetBlogPost(slug || "", {
    query: { enabled: isEditing, queryKey: getGetBlogPostQueryKey(slug || "") }
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
        { slug: post.slug, data },
        {
          onSuccess: () => {
            toast({ title: "Post updated successfully" });
            queryClient.invalidateQueries({ queryKey: getGetBlogPostQueryKey(data.slug) });
            queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
            onSuccess?.();
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
            onSuccess?.();
          },
          onError: () => toast({ variant: "destructive", title: "Failed to create post" })
        }
      );
    }
  };

  if (isEditing && isLoading) return <div className="p-8 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Navigating Corporate Finance" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="navigating-corporate-finance" {...field} />
                  </FormControl>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <FormLabel>Featured Image URL</FormLabel>
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
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea placeholder="A short summary..." className="h-20 resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (HTML tags supported)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your article content here..." 
                    className="min-h-[250px] font-mono text-sm" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm">Publish Status</FormLabel>
                  <FormDescription>Visible on the website</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={createMutation.isPending || updateMutation.isPending}
            className="min-w-[120px]"
          >
            {isEditing ? "Save Changes" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

// Default export as an alias for the named export (deprecated old usage)
export default BlogPostForm;
