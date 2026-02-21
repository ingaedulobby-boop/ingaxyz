import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import desktopBg from "@/assets/desktop-bg.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { ArrowRight, Sparkles } from "lucide-react";

const FULL_TEXT = "I build AI solutions";
const AFTER_TEXT = " people love to use.";

const MOBILE_BREAKPOINT = 640; // Tailwind sm

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  // Update on resize
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Parallax ranges:
  // - Desktop: stronger movement
  // - Mobile: subtle or disabled movement
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : isMobile ? ["0%", "10%"] : ["0%", "30%"]);

  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : isMobile ? ["0%", "5%"] : ["0%", "15%"]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0]);

  const { displayed, done } = useTypingEffect(FULL_TEXT, 55, 600);

  const ctaTransition = { delay: 2.2, duration: 0.6, ease: "easeOut" as const };
  const socialTransition = { delay: 2.8, duration: 0.6, ease: "easeOut" as const };

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Inga portfolio hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">

      {/* Background: use motion only when parallax is active */}
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? {} : { y: bgY }} aria-hidden="true">
        <img
          src={desktopBg}
          alt="Abstract background representing AI and design"
          className="w-full h-full object-cover opacity-30 scale-110"
          loading="eager" />

        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" aria-hidden="true" />

      {/* Content wrapper */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        style={prefersReducedMotion ? {} : { y: contentY, opacity }}>

        <div>
          {/* Role badge */}
          <div className="mb-6 sm:mb-8 min-h-[32px] flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-primary text-[11px] sm:text-xs tracking-widest uppercase">
                AI Engineer · UX Designer · Researcher
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="relative text-3xl sm:text-5xl md:text-7xl font-mono font-bold leading-[1.1] mb-5 sm:mb-6 min-h-[2.4em] lg:text-6xl">
            <span aria-live="polite" aria-atomic="true" className="inline-block">
              <span aria-hidden="true">
                {displayed}
                {!done &&
                <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse-glow align-middle" />
                }
              </span>
            </span>
            {done &&
            <span className="animate-fade-in">
                {" "}
                <span className="text-gradient">people love</span> to use.
              </span>
            }
            <span className="invisible absolute inset-0 pointer-events-none" aria-hidden="true">
              {FULL_TEXT}
              {AFTER_TEXT}
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed"
            style={{ fontFamily: "var(--font-serif)" }}>

            Bridging cutting-edge machine learning with human-centered design.
          </p>
          <p className="text-muted-foreground/60 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
            Every model I build is grounded in real user needs — from research to production. 💜
          </p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={ctaTransition}
          className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-2 w-full">

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-5 sm:px-8 py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-sm sm:text-base text-center shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)] hover:shadow-[0_6px_20px_0_hsl(var(--primary)/0.4)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_0_hsl(var(--primary)/0.3)] transition-all duration-200">

            <Sparkles className="w-4 h-4" aria-hidden="true" />
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 rounded-xl bg-secondary text-secondary-foreground font-mono font-semibold text-sm sm:text-base text-center border border-border hover:border-primary/40 hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">

            Services
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 sm:px-8 py-3 rounded-xl border border-border/60 text-muted-foreground font-mono font-semibold text-sm sm:text-base text-center hover:border-primary hover:text-primary hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">

            Get in Touch
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={socialTransition}
          className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-10 text-muted-foreground/50 text-[11px] sm:text-xs font-mono uppercase tracking-wider">

          <span>15K+ Users Served</span>
          <span className="hidden sm:inline">·</span>
          <span>3 Enterprise Clients</span>
          <span className="hidden sm:inline">·</span>
          <span>4.8★ Avg Rating</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator – only useful on larger screens */}
      {!isMobile &&
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
        transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:block"
        style={prefersReducedMotion ? {} : { opacity }}
        aria-hidden="true">

          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      }
    </section>);

};

export default HeroSection;