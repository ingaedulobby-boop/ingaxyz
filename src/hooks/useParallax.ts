import { useRef } from "react";
import { useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

export function useParallax(speed = 0.3): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // CSS .hero-parallax-layer disables transform on <640px, so we always use desktop range here
  const range = prefersReducedMotion ? 0 : speed * 200;
  const y = useTransform(scrollYProgress, [0, 1], [0, range]);

  return { ref, y };
}
