import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={className}>
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground mt-2 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
