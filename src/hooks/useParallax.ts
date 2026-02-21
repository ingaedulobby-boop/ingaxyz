import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

const MOBILE_BREAKPOINT = 640;

export function useParallax(speed = 0.3): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const range = prefersReducedMotion ? 0 : isMobile ? speed * 66 : speed * 200;
  const y = useTransform(scrollYProgress, [0, 1], [0, range]);

  return { ref, y };
}
