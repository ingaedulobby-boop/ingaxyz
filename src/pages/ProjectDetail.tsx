import { lazy, Suspense, type ComponentType } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

const AIHealthHero = lazy(() => import("@/components/project-hero/AIHealthHero"));
const SmartParserHero = lazy(() => import("@/components/project-hero/SmartParserHero"));
const AccessibilityHero = lazy(() => import("@/components/project-hero/AccessibilityHero"));

const SITE_URL = "https://ingaxyz.lovable.app";

const heroComponents: Record<string, ComponentType> = {
  "ai-health-companion": AIHealthHero,
  "smart-document-parser": SmartParserHero,
  "accessibility-audit-tool": AccessibilityHero
};

const ogImages: Record<string, string> = {
  "ai-health-companion": "/og-health.png",
  "smart-document-parser": "/og-parser.png",
  "accessibility-audit-tool": "/og-accessibility.png"
};

export default function ProjectDetail() {
  const { slug } = useParams<{slug: string;}>();
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-foreground mb-4">Project Not Found</h1>
          <Link to="/" className="text-primary font-mono hover:underline">
            ← Back Home
          </Link>
        </div>
      </div>);

  }

  const HeroComponent = heroComponents[project.slug];
  const pageUrl = `${SITE_URL}/project/${project.slug}`;

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.solution,
    url: pageUrl,
    author: {
      "@type": "Person",
      name: "Inga Kaltak",
      url: SITE_URL
    },
    keywords: project.tools.join(", "),
    about: project.problem
  };

  return (
    <>
      <Helmet>
        <title>{project.title} — Inga Kali | Case Study</title>
        <meta name="description" content={project.solution} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${project.title} — Case Study`} />
        <meta property="og:description" content={project.solution} />
        <meta property="og:image" content={`${SITE_URL}${ogImages[project.slug] || "/og-image.png"}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} — Inga Kali`} />
        <meta name="twitter:description" content={project.outcome} />

        <script type="application/ld+json">{JSON.stringify(projectJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Animated Hero */}
        <div className="relative">
          {HeroComponent ?
          <Suspense fallback={<div className="h-[50vh] min-h-[400px] bg-secondary animate-pulse" />}>
              <HeroComponent />
            </Suspense> :

          <div className="h-[50vh] min-h-[400px] bg-secondary" />
          }

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors mb-4">

              <ArrowLeft className="w-4 h-4" /> Back to portfolio
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}>

              <span
                className={`font-mono text-xs px-2 py-1 rounded ${
                project.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`
                }>

                {project.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-mono font-bold mt-3 text-foreground">{project.title}</h1>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-xl glass">

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, duration: 0.5 }}>

              <p className="font-mono text-xs text-primary mb-1">Role</p>
              <p className="text-sm text-foreground">{project.role}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.2, duration: 0.5 }}>

              <p className="font-mono text-xs text-primary mb-1">Duration</p>
              <p className="text-sm text-foreground">{project.duration}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="col-span-2 sm:col-span-1">

              <p className="font-mono text-xs text-primary mb-1">Tools</p>
              <div className="flex flex-wrap gap-1">
                {project.tools.map((t, ti) =>
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3 + ti * 0.05, duration: 0.3 }}
                  className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground">

                    {t}
                  </motion.span>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Narrative */}
          <div className="space-y-6">
            {project.narrative.map((paragraph, i) =>
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground leading-relaxed">

                {paragraph}
              </motion.p>
            )}
          </div>

          {/* Results */}
          





















          {/* Next project */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border pt-8">

            <Link
              to={`/project/${nextProject.slug}`}
              className="group flex items-center justify-between p-6 rounded-xl glass hover:border-primary/40 transition-all">

              <div>
                <p className="text-xs font-mono text-muted-foreground mb-1">Next Project</p>
                <p className="text-lg font-mono font-bold text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </motion.div>
        </main>
      </div>
    </>);

}