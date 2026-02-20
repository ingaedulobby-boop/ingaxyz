import { motion } from "framer-motion";
import heroImg from "@/assets/hero-accessibility.jpg";

const diagnostics = [
  { label: "Contrast: AAA", color: "text-green-400", x: "12%", y: "22%", delay: 0 },
  { label: "Alt text: Missing", color: "text-amber-400", x: "70%", y: "18%", delay: 0.3 },
  { label: "Focus order: OK", color: "text-green-400", x: "65%", y: "65%", delay: 0.6 },
  { label: "ARIA: 2 warnings", color: "text-amber-400", x: "10%", y: "60%", delay: 0.9 },
];

export default function AccessibilityHero() {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Accessibility Audit Tool interface"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        loading="lazy"
      />

      {/* Green-tinted overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-green-500/5" />

      {/* Diagnostic indicator badges */}
      {diagnostics.map((d) => (
        <motion.div
          key={d.label}
          className="absolute hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border/30 bg-card/70 backdrop-blur-md shadow-lg"
          style={{ left: d.x, top: d.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.03, 1] }}
          transition={{
            opacity: { delay: d.delay + 0.5, duration: 0.5 },
            scale: { delay: d.delay + 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${d.color.includes("green") ? "bg-green-400" : "bg-amber-400"}`} />
          <span className={`text-[11px] font-mono ${d.color}`}>{d.label}</span>
        </motion.div>
      ))}

      {/* Grid overlay lines */}
      <div className="absolute inset-0 hidden md:block pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
