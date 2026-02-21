import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  title: ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={clsx("text-center space-y-4", className)}>
      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
