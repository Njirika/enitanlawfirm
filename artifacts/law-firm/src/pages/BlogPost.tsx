import { useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Link } from "wouter";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";

  const { data: post, isLoading, error } = useGetBlogPost(slug, {
    query: { 
      enabled: !!slug,
      queryKey: getGetBlogPostQueryKey(slug)
    }
  });

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-16 min-h-screen container mx-auto px-4 max-w-4xl">
        <Skeleton className="h-10 w-3/4 mb-6" />
        <div className="flex gap-4 mb-8">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl mb-12" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="w-full pt-32 pb-16 min-h-screen container mx-auto px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been removed.</p>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-24 pb-24 min-h-screen bg-background">
      <article className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/blog">
            <span className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors cursor-pointer text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
            </span>
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center justify-center md:justify-start space-x-2 bg-secondary/10 text-secondary px-4 py-1.5 rounded-full mb-6 text-sm font-bold uppercase tracking-wider">
            <Tag className="w-4 h-4" />
            <span>{post.category}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-muted-foreground font-medium">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-border">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Excerpt/Lead */}
        <div className="text-xl md:text-2xl font-serif text-primary/80 italic mb-10 pl-6 border-l-4 border-secondary leading-relaxed">
          {post.excerpt}
        </div>

        {/* Content Body */}
        <div className="prose prose-lg md:prose-xl prose-stone max-w-none 
          prose-headings:font-serif prose-headings:font-bold prose-headings:text-primary
          prose-a:text-secondary hover:prose-a:text-primary
          prose-strong:text-primary prose-strong:font-bold
          prose-blockquote:border-secondary prose-blockquote:bg-muted/30 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:italic
          prose-img:rounded-xl prose-img:border prose-img:border-border">
          {/* In a real app, you might use a markdown parser here if content is MD. 
              Assuming HTML string from rich text editor for now. */}
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        
        {/* Footer Author Bio Box (Optional extra touch) */}
        <div className="mt-20 pt-10 border-t border-border flex items-center bg-muted/30 p-8 rounded-2xl">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-serif font-bold shrink-0 mr-6">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-lg font-bold text-primary mb-1">Written by {post.author}</h4>
            <p className="text-muted-foreground">Expert legal analysis from the desk of Enitan Afolabi & Company.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
