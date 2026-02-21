import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function StaggerChildren({ children, className = "", stagger = 0.1 }: Props) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
