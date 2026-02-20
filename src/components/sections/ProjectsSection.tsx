import WindowPanel from "@/components/WindowPanel";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Health Companion",
    tag: "AI + UX",
    problem: "Patients struggled to understand AI-generated health insights.",
    solution: "Designed an empathetic conversational UI with progressive disclosure of medical data.",
    outcome: "72% increase in user engagement, 4.8★ app rating.",
    color: "primary" as const,
  },
  {
    title: "Smart Document Parser",
    tag: "ML Engineering",
    problem: "Manual document processing took analysts 6+ hours daily.",
    solution: "Built a transformer-based NLP pipeline with a drag-and-drop interface for non-technical users.",
    outcome: "90% reduction in processing time, adopted by 3 enterprise clients.",
    color: "accent" as const,
  },
  {
    title: "Accessibility Audit Tool",
    tag: "Research + Design",
    problem: "Web teams lacked actionable accessibility insights.",
    solution: "Created an AI-powered scanner with clear remediation steps and severity scoring.",
    outcome: "Used by 200+ teams, improved WCAG compliance by 60%.",
    color: "primary" as const,
  },
];

const ProjectsSection = () => {
  return (
    <WindowPanel title="~/projects" id="projects">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Case <span className="text-gradient">Studies</span>
      </h2>
      <p className="text-muted-foreground mb-8">Where AI meets human-centered design.</p>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group p-6 rounded-lg bg-secondary/30 border border-border hover:border-primary/40 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className={`font-mono text-xs px-2 py-1 rounded ${project.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {project.tag}
                </span>
                <h3 className="text-xl font-bold mt-2">{project.title}</h3>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-mono text-xs text-primary mb-1">Problem</p>
                <p className="text-muted-foreground">{project.problem}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-primary mb-1">Solution</p>
                <p className="text-muted-foreground">{project.solution}</p>
              </div>
              <div>
                <p className="font-mono text-xs text-primary mb-1">Outcome</p>
                <p className="text-foreground font-medium">{project.outcome}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </WindowPanel>
  );
};

export default ProjectsSection;
