import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { Cpu, PenTool, FlaskConical, Zap } from "lucide-react";
import StaggerChildren, { staggerItem } from "@/components/StaggerChildren";
import { motion } from "framer-motion";
import { useState } from "react";

const services = [
  {
    icon: Cpu,
    title: "AI Engineering",
    desc: "End-to-end ML model development, from data pipelines to production deployment.",
    details: [
      "Custom model training & fine-tuning (NLP, vision, tabular)",
      "Scalable data pipeline architecture (ETL, streaming)",
      "MLOps: CI/CD, monitoring, A/B testing in production",
      "Cloud deployment on AWS, GCP, or Azure with auto-scaling",
    ],
  },
  {
    icon: PenTool,
    title: "UX Consulting",
    desc: "Human-centered design for AI products—interfaces that make complex tech feel simple.",
    details: [
      "Heuristic evaluation & UX audit of existing products",
      "Wireframing, prototyping & interaction design",
      "Design system creation with accessible components",
      "Stakeholder workshops to align design with business goals",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research & Testing",
    desc: "User research, A/B testing, and data analysis to validate design and AI decisions.",
    details: [
      "Moderated & unmoderated usability testing",
      "Quantitative A/B and multivariate experiments",
      "Survey design, interviews & persona development",
      "Statistical analysis & actionable insight reports",
    ],
  },
  {
    icon: Zap,
    title: "AI Prototyping",
    desc: "Rapid prototypes that bring AI concepts to life for stakeholders and users.",
    details: [
      "Interactive proof-of-concept demos in 1–2 weeks",
      "LLM-powered feature prototypes (chat, search, agents)",
      "Real-time data visualization & dashboard MVPs",
      "Technical feasibility assessment & architecture roadmap",
    ],
  },
];

function ServiceCard({
  icon: Icon,
  title,
  desc,
  details,
}: (typeof services)[number]) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      className="relative cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      aria-label={`${title} — click to ${flipped ? "hide" : "show"} details`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full min-h-[200px] sm:min-h-[220px]"
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden group p-5 sm:p-6 rounded-lg bg-secondary/30 border border-border 
                     hover:border-accent/40 active:border-accent/50 hover:glow-accent transition-all duration-300 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-accent mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="font-mono font-bold text-base sm:text-lg mb-2">{title}</h3>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1">{desc}</p>
          <p className="text-[10px] text-muted-foreground/60 font-mono mt-3">tap to flip →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 p-5 sm:p-6 rounded-lg bg-accent/10 border border-accent/30 
                     flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-mono font-bold text-sm sm:text-base mb-3 text-accent">{title}</h3>
          <ul className="space-y-2">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/90 leading-snug">
                <span className="text-accent mt-0.5 flex-shrink-0">▸</span>
                {d}
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-muted-foreground/60 font-mono mt-3">tap to flip back ←</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const ServicesSection = () => {
  return (
    <WindowPanel title="services.config" id="services" accent="accent" draggable>
      <SectionHeader
        title={<>What I <span className="text-gradient">Offer</span></>}
        subtitle="Tailored solutions at the intersection of AI and UX."
      />

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </StaggerChildren>
    </WindowPanel>
  );
};

export default ServicesSection;
