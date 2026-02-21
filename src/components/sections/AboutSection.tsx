import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { Brain, Palette, Search, Code, Figma, BarChart3 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const skills = [
{ icon: Brain, label: "Machine Learning", desc: "TensorFlow, PyTorch, scikit-learn" },
{ icon: Code, label: "AI Engineering", desc: "Python, APIs, MLOps pipelines" },
{ icon: Palette, label: "UX Design", desc: "User flows, wireframes, prototyping" },
{ icon: Figma, label: "Design Systems", desc: "Figma, component libraries, tokens" },
{ icon: Search, label: "User Research", desc: "Usability testing, A/B experiments" },
{ icon: BarChart3, label: "Data Analysis", desc: "Metrics, insights, data-driven design" }];


function SkillCard({ icon: Icon, label, desc, index }: {icon: typeof Brain;label: string;desc: string;index: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Each card floats at a slightly different rate for depth
  const offset = 8 + index % 3 * 6;
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [offset, 0, -offset]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      style={isMobile ? undefined : { y }}
      className="p-3 sm:p-4 rounded-xl bg-card/60 border border-border hover:border-primary/30 hover:shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.1)] transition-all duration-300 will-change-transform px-[12px] py-[12px]">



      <div className="icon-badge mb-2.5">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
      </div>
      <p className="font-mono text-xs sm:text-sm font-semibold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
    </motion.div>);

}

const AboutSection = () => {
  return (
    <WindowPanel title="about_me.md" id="about" accent="accent" draggable>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <SectionHeader
            title={<>The <span className="text-gradient">intersection</span> is where the magic happens.</>} />

          
          <p className="leading-relaxed mb-3 sm:mb-4 text-muted-foreground text-sm sm:text-base mt-4">
            I'm a hybrid professional—part AI engineer, part UX designer, with deep research expertise.
            I don't just build models; I make sure they fit intuitively into user experiences.
          </p>
          <p className="leading-relaxed text-muted-foreground text-sm sm:text-base">
            My research skills help me test how users interact with AI systems and inform design decisions.
            The result? AI that isn't just smart—it's usable, delightful, and grounded in real human needs.
          </p>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          {skills.map(({ icon, label, desc }, i) =>
          <SkillCard key={label} icon={icon} label={label} desc={desc} index={i} />
          )}
        </div>
      </div>
    </WindowPanel>);

};

export default AboutSection;