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
    offset: ["start start", "end start"]
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">

      {/* Background */}
      <motion.div className="absolute inset-0 -z-10" style={prefersReducedMotion ? {} : { y: bgY }} aria-hidden="true">
        <img src={desktopBg} alt="" className="h-full w-full object-cover opacity-15 scale-110" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />

        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 text-center"
        style={prefersReducedMotion ? {} : { y: contentY, opacity }}>

        {/* Role Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs tracking-widest uppercase font-mono text-white/80">
              AI Engineer · UX Designer · Researcher
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="relative font-mono font-bold leading-tight mb-6 min-h-[2.4em] text-[clamp(2rem,5vw,4.5rem)]">
          <span aria-live="polite" aria-atomic="true">
            {displayed}
            {!done && <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />}
          </span>

          {done &&
          <span className="animate-fade-in">
              {" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                people love
              </span>{" "}
              to use.
            </span>
          }

          {/* Invisible spacer to prevent layout shift */}
          <span className="invisible absolute inset-0 pointer-events-none">
            {FULL_TEXT}
            {AFTER_TEXT}
          </span>
        </h1>

        {/* Tagline */}
        <p className="max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed mb-4">
          Bridging cutting-edge machine learning with human-centered design.
        </p>

        <p className="max-w-xl mx-auto text-primary text-sm font-light mb-12">
          Every model I build is grounded in real user needs — from research to production.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ctaDelay, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3">

          {/* Projects */}
          <Link
            to="/projects"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-mono font-semibold shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">

            <Sparkles className="w-4 h-4" />
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Services */}
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md font-mono font-semibold transition-all duration-200 hover:bg-white/20 hover:-translate-y-1">

            Services
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-primary text-primary font-mono font-semibold transition-all duration-200 hover:bg-primary/10 hover:-translate-y-1">

            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>);

};

export default HeroSection;