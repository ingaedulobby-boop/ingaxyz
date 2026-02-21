import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import desktopBg from "@/assets/desktop-bg.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";

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
        <img src={desktopBg} alt="" className="w-full h-full object-cover opacity-40 scale-110" />
        <div className="absolute inset-0 bg-background/60" />
      </motion.div>

      <motion.div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto" style={{ y: contentY, opacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>

          {/* Role badge — reserve space to prevent CLS */}
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

          {/* Main headline — reserve min-height to prevent CLS from typing effect */}
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

          {/* Tagline */}
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Bridging cutting-edge machine learning with human-centered design.
          </p>
          <p className="text-muted-foreground/70 text-sm sm:text-base max-w-xl mx-auto mb-10 sm:mb-12">
            Every model I build is grounded in real user needs — from research to production.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-2 w-full">

          <a
            href="#projects"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold text-sm sm:text-base text-center
                       shadow-[0_2px_0_0_hsl(var(--primary)/0.6),inset_0_1px_0_0_hsl(0_0%_100%/0.15)]
                       hover:shadow-[0_1px_0_0_hsl(var(--primary)/0.6),inset_0_1px_0_0_hsl(0_0%_100%/0.15)]
                       hover:translate-y-[1px] active:translate-y-[2px] active:shadow-none
                       transition-all duration-150">
            View Projects
          </a>
          <a
            href="#services"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-accent text-accent-foreground font-mono font-semibold text-sm sm:text-base text-center
                       shadow-[0_2px_0_0_hsl(var(--accent)/0.6),inset_0_1px_0_0_hsl(0_0%_100%/0.15)]
                       hover:shadow-[0_1px_0_0_hsl(var(--accent)/0.6),inset_0_1px_0_0_hsl(0_0%_100%/0.15)]
                       hover:translate-y-[1px] active:translate-y-[2px] active:shadow-none
                       transition-all duration-150">
            Services
          </a>
          <a
            href="#contact"
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-mono font-semibold text-sm sm:text-base text-center
                       shadow-[0_2px_0_0_hsl(var(--border)),inset_0_1px_0_0_hsl(0_0%_100%/0.05)]
                       hover:shadow-[0_1px_0_0_hsl(var(--border)),inset_0_1px_0_0_hsl(0_0%_100%/0.05)]
                       hover:translate-y-[1px] hover:border-primary hover:text-primary
                       active:translate-y-[2px] active:shadow-none
                       transition-all duration-150">
            Get in Touch
          </a>
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
