import WindowPanel from "@/components/WindowPanel";
import { Cpu, PenTool, FlaskConical, Zap } from "lucide-react";

const services = [
  {
    icon: Cpu,
    title: "AI Engineering",
    desc: "End-to-end ML model development, from data pipelines to production deployment.",
  },
  {
    icon: PenTool,
    title: "UX Consulting",
    desc: "Human-centered design for AI products—interfaces that make complex tech feel simple.",
  },
  {
    icon: FlaskConical,
    title: "Research & Testing",
    desc: "User research, A/B testing, and data analysis to validate design and AI decisions.",
  },
  {
    icon: Zap,
    title: "AI Prototyping",
    desc: "Rapid prototypes that bring AI concepts to life for stakeholders and users.",
  },
];

const ServicesSection = () => {
  return (
    <WindowPanel title="services.config" id="services" accent="accent">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        What I <span className="text-gradient">Offer</span>
      </h2>
      <p className="text-muted-foreground mb-8">Tailored solutions at the intersection of AI and UX.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group p-6 rounded-lg bg-secondary/30 border border-border 
                       hover:border-accent/40 hover:glow-accent transition-all duration-300"
          >
            <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-mono font-bold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </WindowPanel>
  );
};

export default ServicesSection;
