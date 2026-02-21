import WindowPanel from "@/components/WindowPanel";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  categories: string[];
  thumbnail: string | null;
}

const fallbackPosts: SubstackPost[] = [
  {
    pubDate: "2026-02-15",
    title: "Why Your AI Product Needs a UX Researcher, Not Just Engineers",
    excerpt: "The gap between a technically impressive model and a product people actually use is bridged by research.",
    categories: ["UX + AI"],
    link: "https://ingakali.substack.com",
    thumbnail: null,
  },
  {
    pubDate: "2026-01-28",
    title: "Designing Trust: How Visual Cues Shape AI Perception",
    excerpt: "Users don't trust black boxes. Here's how design choices can make AI feel transparent and reliable.",
    categories: ["Design"],
    link: "https://ingakali.substack.com",
    thumbnail: null,
  },
  {
    pubDate: "2026-01-10",
    title: "From Jupyter to Production: An ML Engineer's UX Checklist",
    excerpt: "A practical checklist for ensuring your ML pipeline outputs feed into delightful user experiences.",
    categories: ["Engineering"],
    link: "https://ingakali.substack.com",
    thumbnail: null,
  },
];

function estimateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const BlogSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["substack-posts"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-substack-feed");
      if (error) throw error;
      return data as { posts: SubstackPost[] };
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const posts = data?.posts?.length ? data.posts : fallbackPosts;

  return (
    <WindowPanel title="blog/" id="blog" accent="accent" draggable>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
        Latest <span className="text-gradient">Thoughts</span>
      </h2>
      <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
        On AI, UX, and everything in between.
      </p>

      <div className="space-y-3 sm:space-y-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 sm:gap-4 p-3 sm:p-4">
                <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          : posts.map((post) => (
              <a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg 
                           hover:bg-secondary/40 active:bg-secondary/50 transition-colors cursor-pointer"
              >
                {post.thumbnail && (
                  <img
                    src={post.thumbnail}
                    alt=""
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0 bg-muted"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      {formatDate(post.pubDate)}
                    </span>
                    {(post.categories?.length ? post.categories : ["Blog"]).slice(0, 1).map((cat) => (
                      <span
                        key={cat}
                        className="font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded bg-accent/10 text-accent"
                      >
                        {cat}
                      </span>
                    ))}
                    <span className="font-mono text-[10px] sm:text-xs text-muted-foreground">
                      · {estimateReadTime(post.excerpt)} min read
                    </span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 hidden sm:block" />
              </a>
            ))}
      </div>

      <div className="mt-6 sm:mt-8 pt-4 border-t border-border">
        <Button asChild variant="outline" className="w-full sm:w-auto gap-2">
          <a href="https://ingakali.substack.com" target="_blank" rel="noopener noreferrer">
            Subscribe on Substack
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </WindowPanel>
  );
};

export default BlogSection;
