import WindowPanel from "@/components/WindowPanel";
import { Brain, Palette, Search, Code, Figma, BarChart3 } from "lucide-react";
import StaggerChildren, { staggerItem } from "@/components/StaggerChildren";
import { motion } from "framer-motion";

const skills = [
  { icon: Brain, label: "Machine Learning", desc: "TensorFlow, PyTorch, scikit-learn" },
  { icon: Code, label: "AI Engineering", desc: "Python, APIs, MLOps pipelines" },
  { icon: Palette, label: "UX Design", desc: "User flows, wireframes, prototyping" },
  { icon: Figma, label: "Design Systems", desc: "Figma, component libraries, tokens" },
  { icon: Search, label: "User Research", desc: "Usability testing, A/B experiments" },
  { icon: BarChart3, label: "Data Analysis", desc: "Metrics, insights, data-driven design" },
];

const AboutSection = () => {
  return (
    <WindowPanel title="about_me.md" id="about" accent="accent" draggable>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            The <span className="text-gradient">intersection</span> is where the magic happens.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a hybrid professional—part AI engineer, part UX designer, with deep research expertise. 
            I don't just build models; I make sure they fit intuitively into user experiences.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My research skills help me test how users interact with AI systems and inform design decisions. 
            The result? AI that isn't just smart—it's usable, delightful, and grounded in real human needs.
          </p>
        </div>
        <StaggerChildren className="grid grid-cols-2 gap-3">
          {skills.map(({ icon: Icon, label, desc }) => (
            <motion.div key={label} variants={staggerItem} className="p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="font-mono text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{desc}</p>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </WindowPanel>
  );
};

export default AboutSection;
