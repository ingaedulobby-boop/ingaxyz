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

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "20%"]);

  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "10%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0]);

  const { displayed, done } = useTypingEffect(FULL_TEXT, 55, 600);
  const ctaDelay = prefersReducedMotion ? 0 : 2.2;

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Inga portfolio hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Animated Gradient Background (Lovable Safe) */}
      <motion.div className="absolute inset-0" style={prefersReducedMotion ? {} : { y: bgY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.4),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.4),transparent_40%)] animate-pulse-slow" />
        <img src={desktopBg} alt="" className="w-full h-full object-cover opacity-10 scale-110" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
      </motion.div>

      {/* Floating Light Orbs */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"
            animate={{ x: [0, 80, -60, 0], y: [0, -40, 60, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
            animate={{ x: [0, -100, 60, 0], y: [0, 80, -40, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 text-center section-px max-w-4xl mx-auto py-20 sm:py-0"
        style={prefersReducedMotion ? {} : { y: contentY, opacity }}
      >
        {/* Role Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-primary text-xs tracking-widest uppercase">
              AI Engineer · UX Designer · Researcher
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="relative font-mono font-bold leading-[1.1] mb-6 min-h-[2.4em] text-[clamp(1.75rem,5vw,4.5rem)] text-white">
          <span aria-live="polite" aria-atomic="true">
            {displayed}
            {!done && <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse" />}
          </span>
          {done && (
            <span className="animate-fade-in">
              {" "}
              <span className="text-gradient">people love</span> to use.
            </span>
          )}
          <span className="invisible absolute inset-0 pointer-events-none">
            {FULL_TEXT}
            {AFTER_TEXT}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-muted-foreground max-w-2xl mx-auto mb-3 leading-relaxed">
          Bridging cutting-edge machine learning with human-centered design.
        </p>

        <p className="max-w-xl mx-auto mb-12 font-light text-xs text-primary">
          Every model I build is grounded in real user needs — from research to production. 💜
        </p>

        {/* CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ctaDelay, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold shadow-lg hover:-translate-y-1 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="px-8 py-3 rounded-xl border border-primary/40 text-primary font-mono font-semibold hover:bg-primary/10 transition-all"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
