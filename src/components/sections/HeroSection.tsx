import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import desktopBg from "@/assets/desktop-bg.jpg";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { ArrowRight, Sparkles } from "lucide-react";

const FULL_TEXT = "I build AI solutions";
const AFTER_TEXT = " people love to use.";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const prefersReducedMotion = useReducedMotion();

  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "30%"]);

  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ["0%", "0%"] : ["0%", "15%"]);

  const opacity = useTransform(scrollYProgress, [0, 0.8], prefersReducedMotion ? [1, 1] : [1, 0]);

  const { displayed, done } = useTypingEffect(FULL_TEXT, 55, 600);
  const ctaDelay = prefersReducedMotion ? 0 : 2.2;

  // =============================
  // THREE.JS PARTICLE BACKGROUND
  // =============================
  useEffect(() => {
    if (!canvasRef.current || prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const particleCount = 25000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 1.8 + Math.random() * 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.015,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      points.rotation.y = elapsed * 0.08;
      points.rotation.x = elapsed * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvasRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      id="home"
      aria-label="Inga portfolio hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Three.js Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Fallback Background Image */}
      <motion.div
        className="absolute inset-0 hero-parallax-layer z-0"
        style={prefersReducedMotion ? {} : { y: bgY }}
        aria-hidden="true"
      >
        <img src={desktopBg} alt="" className="w-full h-full object-cover opacity-20 scale-110" loading="eager" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </motion.div>

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
