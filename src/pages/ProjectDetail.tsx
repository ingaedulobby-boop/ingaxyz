import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import AIHealthHero from "@/components/project-hero/AIHealthHero";
import SmartParserHero from "@/components/project-hero/SmartParserHero";
import AccessibilityHero from "@/components/project-hero/AccessibilityHero";

const heroComponents: Record<string, React.ComponentType> = {
  "ai-health-companion": AIHealthHero,
  "smart-document-parser": SmartParserHero,
  "accessibility-audit-tool": AccessibilityHero,
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary font-mono hover:underline">← Back Home</Link>
        </div>
      </div>
    );
  }

  const HeroComponent = heroComponents[project.slug];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Hero */}
      <div className="relative">
        {HeroComponent ? <HeroComponent /> : (
          <div className="h-[50vh] min-h-[400px] bg-secondary" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to portfolio
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span
              className={`font-mono text-xs px-2 py-1 rounded ${
                project.color === "primary"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {project.tag}
            </span>
            <h1 className="text-3xl sm:text-5xl font-mono font-bold mt-3 text-foreground">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-xl glass"
        >
          <div>
            <p className="font-mono text-xs text-primary mb-1">Role</p>
            <p className="text-sm text-foreground">{project.role}</p>
          </div>
          <div>
            <p className="font-mono text-xs text-primary mb-1">Duration</p>
            <p className="text-sm text-foreground">{project.duration}</p>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-mono text-xs text-primary mb-1">Tools</p>
            <div className="flex flex-wrap gap-1">
              {project.tools.map((t) => (
                <span key={t} className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Narrative */}
        <div className="space-y-6">
          {project.narrative.map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {project.results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 rounded-xl glass"
            >
              <p className="text-2xl sm:text-3xl font-mono font-bold text-primary">{r.value}</p>
              <p className="text-xs font-mono text-muted-foreground mt-1">{r.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Next project */}
        <div className="border-t border-border pt-8">
          <Link
            to={`/project/${nextProject.slug}`}
            className="group flex items-center justify-between p-6 rounded-xl glass hover:border-primary/40 transition-all"
          >
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-1">Next Project</p>
              <p className="text-lg font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                {nextProject.title}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </main>
    </div>
  );
}
