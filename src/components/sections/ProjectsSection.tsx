import { Link } from "react-router-dom";
import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

// Import project images
import healthImg from "@/assets/project-health.jpg";
import documentImg from "@/assets/project-document.jpg";
import accessibilityImg from "@/assets/project-accessibility.jpg";

const projectImages: Record<string, string> = {
  "ai-health-companion": healthImg,
  "smart-document-parser": documentImg,
  "accessibility-audit-tool": accessibilityImg,
};

const ProjectsSection = () => {
  return (
    <WindowPanel title="~/projects" id="projects" draggable>
      <SectionHeader
        title={<>Case <span className="text-gradient">Studies</span></>}
        subtitle="Where AI meets human-centered design."
      />

      <div className="space-y-5 sm:space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to={`/project/${project.slug}`}
              className="group block rounded-xl bg-card/60 border border-border overflow-hidden
                         hover:border-primary/30 hover:shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.15)]
                         transition-all duration-300"
            >
              {/* Project image */}
              <div className="relative h-36 sm:h-44 overflow-hidden">
                <img
                  src={projectImages[project.slug]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
                
                {/* Floating tag */}
                <div className="absolute top-3 left-3">
                  <span className={`font-mono text-[11px] px-2.5 py-1 rounded-full backdrop-blur-md
                    ${project.color === "primary" 
                      ? "bg-primary/20 text-primary border border-primary/20" 
                      : "bg-accent/20 text-accent border border-accent/20"
                    }`}>
                    {project.tag}
                  </span>
                </div>

                {/* Arrow */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">{project.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{project.solution}</p>
                
                {/* Metric chips */}
                <div className="flex flex-wrap gap-2">
                  {project.results.slice(0, 3).map((r) => (
                    <span key={r.label} className="metric-chip">
                      {r.value} <span className="text-muted-foreground font-normal">{r.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </WindowPanel>
  );
};

export default ProjectsSection;
