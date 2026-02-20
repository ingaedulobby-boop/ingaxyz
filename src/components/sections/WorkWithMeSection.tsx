import WindowPanel from "@/components/WindowPanel";
import { MessageSquare, Rocket, Lightbulb } from "lucide-react";

const modes = [
  {
    icon: MessageSquare,
    title: "Consulting",
    desc: "Strategic guidance on integrating AI into your product with user-first thinking.",
  },
  {
    icon: Rocket,
    title: "Design Sprints",
    desc: "Intensive 1–2 week sprints to prototype and validate AI-powered experiences.",
  },
  {
    icon: Lightbulb,
    title: "Full Collaboration",
    desc: "Embedded partner for end-to-end AI product design, engineering, and research.",
  },
];

const WorkWithMeSection = () => {
  return (
    <WindowPanel title="collaboration.yml" id="work-with-me">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">
        Work <span className="text-gradient">With Me</span>
      </h2>
      <p className="text-muted-foreground mb-8">Choose an engagement model that fits your needs.</p>

      <div className="grid sm:grid-cols-3 gap-4">
        {modes.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="text-center p-6 rounded-lg bg-secondary/30 border border-border 
                       hover:border-primary/40 transition-all duration-300"
          >
            <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-mono font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </WindowPanel>
  );
};

export default WorkWithMeSection;
