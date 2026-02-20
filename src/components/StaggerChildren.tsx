import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

const container = (stagger: number) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const StaggerChildren = ({ children, className = "", staggerDelay = 0.12 }: StaggerChildrenProps) => (
  <motion.div
    variants={container(staggerDelay)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-40px" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default StaggerChildren;
