import { motion } from "framer-motion";
import heroImg from "@/assets/hero-document.jpg";

const docLayers = [
  { label: "Invoice #4821", x: "8%", y: "25%", delay: 0, rotate: -3 },
  { label: "Contract_v2.pdf", x: "55%", y: "18%", delay: 0.4, rotate: 2 },
  { label: "Report_Q4.docx", x: "35%", y: "60%", delay: 0.8, rotate: -1 },
];

export default function SmartParserHero() {
  return (
    <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Smart Document Parser interface"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        loading="lazy"
      />

      {/* Violet gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-accent/10" />

      {/* Floating document layers */}
      {docLayers.map((d) => (
        <motion.div
          key={d.label}
          className="absolute hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-accent/20 bg-card/60 backdrop-blur-md shadow-lg"
          style={{ left: d.x, top: d.y }}
          initial={{ opacity: 0, y: 30, rotate: d.rotate }}
          animate={{ opacity: 1, y: [0, -6, 0], rotate: d.rotate }}
          transition={{
            opacity: { delay: d.delay + 0.5, duration: 0.6 },
            y: { delay: d.delay + 1.1, duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-mono text-accent">{d.label}</span>
        </motion.div>
      ))}

      {/* OCR scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent hidden md:block"
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
