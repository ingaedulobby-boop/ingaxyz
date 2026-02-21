import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import desktopBg from "@/assets/desktop-bg.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const { displayed, done } = useTypingEffect("I build AI solutions", 55, 600);

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img src={desktopBg} alt="" className="w-full h-full object-cover opacity-30 scale-110" />
        <div className="absolute inset-0 bg-background/50" />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />

      <motion.div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto" style={{ y: contentY, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          {/* Role badge */}
          <div className="mb-6 sm:mb-8 min-h-[32px] flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-primary text-[11px] sm:text-xs tracking-widest uppercase">
                AI Engineer · UX Designer · Researcher
              </span>
            </motion.div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-mono font-bold leading-[1.1] mb-5 sm:mb-6 min-h-[2.4em]">
            {displayed}
            {!done && <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse-glow align-middle" />}
            {done &&
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
                {" "}
                <span className="text-gradient">people love</span>{" "}
                to use.
              </motion.span>
            }
          </h1>

          {/* Tagline — serif accent for consulting elegance */}
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-3 leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
            Bridging cutting-edge machine learning with human-centered design.
          </p>
          <p className="text-muted-foreground/60 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
            Every model I build is grounded in real user needs — from research to production. 💜
          </p>
        </motion.div>

        {/* CTA buttons — refined with icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-2 w-full">

          <Link
            to="/projects"
            className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-sm sm:text-base text-center
                       shadow-[0_4px_14px_0_hsl(var(--primary)/0.3)]
                       hover:shadow-[0_6px_20px_0_hsl(var(--primary)/0.4)]
                       hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_2px_8px_0_hsl(var(--primary)/0.3)]
                       transition-all duration-200">
            <Sparkles className="w-4 h-4" />
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-secondary text-secondary-foreground font-mono font-semibold text-sm sm:text-base text-center
                       border border-border
                       hover:border-primary/40 hover:bg-secondary/80 hover:-translate-y-0.5
                       active:translate-y-0
                       transition-all duration-200">
            Services
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border border-border/60 text-muted-foreground font-mono font-semibold text-sm sm:text-base text-center
                       hover:border-primary hover:text-primary hover:-translate-y-0.5
                       active:translate-y-0
                       transition-all duration-200">
            Get in Touch
          </Link>
        </motion.div>

        {/* Social proof / trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 text-muted-foreground/50 text-xs font-mono uppercase tracking-wider"
        >
          <span>15K+ Users Served</span>
          <span className="hidden sm:inline">·</span>
          <span>3 Enterprise Clients</span>
          <span className="hidden sm:inline">·</span>
          <span>4.8★ Avg Rating</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 hidden sm:block"
        style={{ opacity }}>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
