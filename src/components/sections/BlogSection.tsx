import WindowPanel from "@/components/WindowPanel";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    date: "2026-02-15",
    title: "Why Your AI Product Needs a UX Researcher, Not Just Engineers",
    excerpt: "The gap between a technically impressive model and a product people actually use is bridged by research.",
    tag: "UX + AI",
  },
  {
    date: "2026-01-28",
    title: "Designing Trust: How Visual Cues Shape AI Perception",
    excerpt: "Users don't trust black boxes. Here's how design choices can make AI feel transparent and reliable.",
    tag: "Design",
  },
  {
    date: "2026-01-10",
    title: "From Jupyter to Production: An ML Engineer's UX Checklist",
    excerpt: "A practical checklist for ensuring your ML pipeline outputs feed into delightful user experiences.",
    tag: "Engineering",
  },
];

const BlogSection = () => {
  return (
    <WindowPanel title="blog/" id="blog" accent="accent" draggable>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Latest <span className="text-gradient">Thoughts</span>
      </h2>
      <p className="text-muted-foreground mb-8">On AI, UX, and everything in between.</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.title}
            className="group flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/40 transition-colors cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-xs text-muted-foreground">{post.date}</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent/10 text-accent">{post.tag}</span>
              </div>
              <h3 className="font-bold group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{post.excerpt}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </article>
        ))}
      </div>
    </WindowPanel>
  );
};

export default BlogSection;
