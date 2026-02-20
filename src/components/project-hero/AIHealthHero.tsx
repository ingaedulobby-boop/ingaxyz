import { motion } from "framer-motion";
import heroImg from "@/assets/hero-health.jpg";

const floatingMetrics = [
  { label: "Heart Rate", value: "72 bpm", x: "10%", y: "20%", delay: 0 },
  { label: "SpO2", value: "98%", x: "75%", y: "15%", delay: 0.3 },
  { label: "Sleep Score", value: "87", x: "60%", y: "70%", delay: 0.6 },
  { label: "Stress", value: "Low", x: "15%", y: "65%", delay: 0.9 },
];

export default function AIHealthHero() {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="AI Health Companion dashboard"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        loading="lazy"
      />
      
      {/* Cyan glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-primary/10" />
      
      {/* Floating health metric cards */}
      {floatingMetrics.map((m) => (
        <motion.div
          key={m.label}
          className="absolute hidden md:flex flex-col px-3 py-2 rounded-lg border border-primary/20 bg-card/60 backdrop-blur-md shadow-lg"
          style={{ left: m.x, top: m.y }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: m.delay + 0.5, duration: 0.6 },
            y: { delay: m.delay + 1.1, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <span className="text-[10px] font-mono text-muted-foreground">{m.label}</span>
          <span className="text-sm font-mono font-bold text-primary">{m.value}</span>
        </motion.div>
      ))}

      {/* Pulse ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-primary/30 hidden md:block"
        animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
