import { useState } from "react";
import { Link } from "wouter";
import { format } from "date-fns";
import { Search, Calendar, User, ChevronRight } from "lucide-react";
import { 
  useListBlogPosts, 
  useListBlogCategories,
  getListBlogPostsQueryKey
} from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogList() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Simple debounce for search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(e.target.value);
      setPage(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const { data: categoriesData } = useListBlogCategories();
  
  const queryParams = {
    page,
    limit: 6,
    ...(category !== "all" && { category }),
    ...(debouncedSearch && { search: debouncedSearch }),
  };

  const { data: blogData, isLoading } = useListBlogPosts(queryParams, {
    query: { queryKey: getListBlogPostsQueryKey(queryParams) }
  });

  return (
    <div className="w-full pt-24 pb-16 min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            Legal Insights & News
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Expert commentary, firm updates, and analysis on the latest legal developments in Nigeria and the global marketplace.
          </p>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 h-12 bg-card border-border"
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select 
              value={category} 
              onValueChange={(v) => { setCategory(v); setPage(1); }}
            >
              <SelectTrigger className="h-12 bg-card border-border">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesData?.categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex flex-col space-y-4">
                <Skeleton className="h-56 w-full rounded-xl" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : blogData?.items.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-xl border border-border">
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
            <Button 
              variant="outline" 
              className="mt-6"
              onClick={() => { setSearch(""); setDebouncedSearch(""); setCategory("all"); }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {blogData?.items.map((post) => (
                <div key={post.id} className="group flex flex-col bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="h-56 w-full overflow-hidden relative">
                    <img 
                      src={post.featuredImage || "/images/blog-1.png"} 
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground mb-4 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5" />
                        {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <User className="w-4 h-4 mr-1.5" />
                        {post.author}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-serif font-bold text-primary mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <span className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors cursor-pointer mt-auto">
                        Read Article <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {blogData && blogData.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button 
                      variant="ghost" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="gap-1 pl-2.5"
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                      <span>Previous</span>
                    </Button>
                  </PaginationItem>
                  
                  <div className="flex items-center mx-4 text-sm font-medium">
                    Page {page} of {blogData.totalPages}
                  </div>

                  <PaginationItem>
                    <Button 
                      variant="ghost" 
                      onClick={() => setPage(p => Math.min(blogData.totalPages, p + 1))}
                      disabled={page === blogData.totalPages}
                      className="gap-1 pr-2.5"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </section>
    </div>
  );
}
