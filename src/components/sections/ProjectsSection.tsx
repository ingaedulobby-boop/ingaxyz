import { Link } from "react-router-dom";
import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <WindowPanel title="~/projects" id="projects" draggable>
      <SectionHeader
        title={<>Case <span className="text-gradient">Studies</span></>}
        subtitle="Where AI meets human-centered design."
      />

      <div className="space-y-4 sm:space-y-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={`/project/${project.slug}`}
              className="group block p-4 sm:p-6 rounded-lg bg-secondary/30 border border-border 
                         hover:border-primary/40 active:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`font-mono text-xs px-2 py-1 rounded ${project.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    {project.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-2">{project.title}</h3>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                <div>
                  <p className="font-mono text-xs text-primary mb-1">Problem</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{project.problem}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-primary mb-1">Solution</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">{project.solution}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-primary mb-1">Outcome</p>
                  <p className="text-foreground font-medium text-xs sm:text-sm">{project.outcome}</p>
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
