import { motion } from "framer-motion";
import { ReactNode } from "react";

interface WindowPanelProps {
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  accent?: "primary" | "accent";
}

const WindowPanel = ({ title, id, children, className = "", accent = "primary" }: WindowPanelProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-strong rounded-lg window-shadow overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-window-header border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-destructive/80" />
          <span className="w-3 h-3 rounded-full bg-[hsl(45_80%_55%)]" />
          <span className="w-3 h-3 rounded-full bg-[hsl(140_60%_45%)]" />
        </div>
        <span className={`font-mono text-sm ml-2 ${accent === "primary" ? "text-primary" : "text-accent"}`}>
          {title}
        </span>
      </div>
      <div className="p-6 md:p-8">
        {children}
      </div>
    </motion.section>
  );
};

export default WindowPanel;
