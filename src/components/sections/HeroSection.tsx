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

          <p className="font-mono text-primary text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 uppercase">
            AI Engineer · UX Designer · Researcher
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-mono font-bold leading-tight mb-4 sm:mb-6">
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
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Bridging cutting-edge machine learning with human-centered design.
            Every model I build is grounded in real user needs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center
            gap-3 sm:gap-4 px-3 w-full">

          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-center
                       hover:glow-primary transition-all duration-300 hover:scale-105">
            View Projects
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3 rounded-lg border border-border text-foreground font-mono font-semibold text-center
                       hover:border-primary hover:text-primary transition-all duration-300">
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
    </section>);

};

export default HeroSection;