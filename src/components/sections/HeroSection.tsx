import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import desktopBg from "@/assets/desktop-bg.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { ArrowRight, Sparkles } from "lucide-react";

const FULL_TEXT = "I build AI solutions";
const AFTER_TEXT = " people love to use.";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Parallax — CSS handles disabling on mobile via the wrapper class
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0]);

  const { displayed, done } = useTypingEffect(FULL_TEXT, 55, 600);

  const ctaDelay = prefersReducedMotion ? 0 : 2.2;

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Inga portfolio hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background — parallax disabled on small screens via CSS */}
      <motion.div
        className="absolute inset-0 hero-parallax-layer"
        style={prefersReducedMotion ? {} : { y: bgY }}
        aria-hidden="true"
      >
        <img src={desktopBg} alt="" className="w-full h-full object-cover opacity-30 scale-110" loading="eager" />

        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" aria-hidden="true" />

      {/* Content wrapper — parallax disabled on small screens via CSS */}
      <motion.div
        className="relative z-10 text-center section-px max-w-4xl mx-auto py-20 sm:py-0 hero-parallax-layer"
        style={prefersReducedMotion ? {} : { y: contentY, opacity }}
      >
        {/* Role badge */}
        <div className="mb-6 sm:mb-8 min-h-[32px] flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-primary text-[9px] sm:text-xs tracking-widest uppercase">
              AI Engineer · UX Designer · Researcher
            </span>
          </div>
        </div>

        {/* Headline — fluid text scaling */}
        <h1 className="relative font-mono font-bold leading-[1.1] mb-5 sm:mb-6 min-h-[2.4em] text-[clamp(1.75rem,5vw,4.5rem)]">
          <span aria-live="polite" aria-atomic="true" className="inline-block">
            <span aria-hidden="true">
              {displayed}
              {!done && (
                <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse-glow align-middle" />
              )}
            </span>
          </span>
          {done && (
            <span className="animate-fade-in">
              {" "}
              <span className="text-gradient">people love</span> to use.
            </span>
          )}
          <span className="invisible absolute inset-0 pointer-events-none" aria-hidden="true">
            {FULL_TEXT}
            {AFTER_TEXT}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="text-muted-foreground text-[clamp(0.938rem,2.5vw,1.25rem)] max-w-2xl mx-auto mb-3 leading-relaxed"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Bridging cutting-edge machine learning with human-centered design.
        </p>
        <p className="max-w-xl mx-auto mb-10 sm:mb-12 font-light text-xs text-primary">
          Every model I build is grounded in real user needs — from research to production. 💜
        </p>

        {/* CTAs — column on mobile, row on sm+ */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ctaDelay, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[40px] px-6 sm:px-8 py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-sm sm:text-base shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_20px_0_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_0_hsl(var(--primary)/0.3)] transition-all duration-200"
          >
            <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
            View Projects
            <ArrowRight
              className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[40px] px-6 sm:px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-mono font-semibold text-sm sm:text-base border border-border hover:border-primary/40 hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Services
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[40px] px-6 sm:px-8 py-3 rounded-xl border border-border/60 text-muted-foreground font-mono font-semibold text-sm sm:text-base hover:border-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator – hidden on mobile via CSS */}
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:block"
        style={prefersReducedMotion ? {} : { opacity }}
        aria-hidden="true"
      >
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
