import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { MessageSquare, Rocket, Lightbulb } from "lucide-react";
import StaggerChildren, { staggerItem } from "@/components/StaggerChildren";
import { motion } from "framer-motion";

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
    <WindowPanel title="collaboration.yml" id="work-with-me" draggable>
      <SectionHeader
        title={<>Work <span className="text-gradient">With Me</span></>}
        subtitle="Choose an engagement model that fits your needs."
      />

      <StaggerChildren className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {modes.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={staggerItem}
            className="text-center p-5 sm:p-6 rounded-lg bg-secondary/30 border border-border 
                       hover:border-primary/40 active:border-primary/50 transition-all duration-300"
          >
            <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-mono font-bold mb-2 text-sm sm:text-base">{title}</h3>
            <p className="text-muted-foreground text-xs sm:text-sm">{desc}</p>
          </motion.div>
        ))}
      </StaggerChildren>
    </WindowPanel>
  );
};

export default WorkWithMeSection;
