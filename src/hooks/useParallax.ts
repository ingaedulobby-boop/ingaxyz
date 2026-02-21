import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax(speed = 0.3): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);
  return { ref, y };
}
