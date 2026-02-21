import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";

// Generate a deterministic neural network graph
function generateNetwork(nodeCount: number, seed: number) {
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + seed;
    const radius = 120 + ((i * 37 + seed * 13) % 80);
    nodes.push({
      x: 250 + Math.cos(angle) * radius + ((i * 23) % 40) - 20,
      y: 200 + Math.sin(angle) * radius + ((i * 17) % 30) - 15,
    });
  }
  const edges: { from: number; to: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 160) {
        edges.push({ from: i, to: j });
      }
    }
  }
  return { nodes, edges };
}

function NeuralNetworkSVG() {
  const prefersReduced = useReducedMotion();
  const { nodes, edges } = useMemo(() => generateNetwork(14, 3), []);

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
      viewBox="0 0 500 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {edges.map((e, i) => (
        <motion.line
          key={`e${i}`}
          x1={nodes[e.from].x}
          y1={nodes[e.from].y}
          x2={nodes[e.to].x}
          y2={nodes[e.to].y}
          stroke="rgb(139,92,246)"
          strokeWidth={0.8}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: prefersReduced ? 0 : 1.5,
            delay: prefersReduced ? 0 : 0.5 + i * 0.04,
            ease: "easeOut",
          }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={2.5}
          fill="rgb(34,211,238)"
          initial={{ scale: 0, opacity: 0 }}
          animate={prefersReduced ? { scale: 1, opacity: 1 } : {
            scale: [0, 1.3, 1],
            opacity: [0, 1, 0.8],
          }}
          transition={{
            duration: prefersReduced ? 0 : 0.6,
            delay: prefersReduced ? 0 : 0.3 + i * 0.06,
          }}
        />
      ))}
      {/* Pulse traveling along a few edges */}
      {!prefersReduced && edges.slice(0, 5).map((e, i) => (
        <motion.circle
          key={`p${i}`}
          r={1.5}
          fill="rgb(34,211,238)"
          initial={{ opacity: 0 }}
          animate={{
            cx: [nodes[e.from].x, nodes[e.to].x],
            cy: [nodes[e.from].y, nodes[e.to].y],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3,
            delay: 2 + i * 1.2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

const files = [
  { name: "Invoice #4821", type: "PDF" },
  { name: "Contract_v2.pdf", type: "PDF" },
  { name: "Report_Q4.docx", type: "DOCX" },
];

const heatmapFields = [
  { field: "Invoice Total", confidence: 96 },
  { field: "Vendor Name", confidence: 88 },
  { field: "Due Date", confidence: 73 },
];

const stats = [
  { label: "Processing Time", value: "-90%", color: "text-emerald-400" },
  { label: "Extraction Accuracy", value: "96%", color: "text-cyan-400" },
  { label: "Enterprise Clients", value: "3", color: "text-purple-400" },
  { label: "Documents / Day", value: "2,000+", color: "text-amber-400" },
];

function barColor(confidence: number) {
  if (confidence > 90) return "bg-emerald-400";
  if (confidence > 80) return "bg-amber-400";
  return "bg-rose-400";
}

export default function SmartParserHero() {
  const { ref, y } = useParallax(0.3);
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hoveredFile, setHoveredFile] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || prefersReduced) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const yVal = (e.clientY - top - height / 2) / 25;
    setTilt({ x, y: yVal });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Neural network background */}
      <NeuralNetworkSVG />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      {/* OCR scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent hidden md:block pointer-events-none z-20"
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main glassmorphism card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 sm:p-7 shadow-[0_0_60px_rgba(139,92,246,0.15)]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 20 }}
        style={{
          transform: isMobile || prefersReduced
            ? undefined
            : `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <h3 className="text-base sm:text-lg font-mono font-semibold text-slate-100 mb-4">
          Smart Document Parser
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* File list */}
          <div className="space-y-2">
            {files.map((f, i) => (
              <motion.div
                key={f.name}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                  hoveredFile === i
                    ? "border-cyan-400/40 bg-white/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.3 + i * 0.1, duration: 0.5 }}
                onHoverStart={() => setHoveredFile(i)}
                onHoverEnd={() => setHoveredFile(null)}
              >
                {hoveredFile === i && (
                  <motion.div
                    layoutId="file-highlight"
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-cyan-400"
                  />
                )}
                <div className="w-2 h-2 rounded-full bg-cyan-400/60" />
                <span className="text-xs sm:text-sm font-mono text-slate-200">{f.name}</span>
                <span className="ml-auto text-[10px] font-mono text-slate-500">{f.type}</span>
              </motion.div>
            ))}
          </div>

          {/* Confidence heatmap */}
          <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
            <p className="text-[11px] font-mono text-slate-400 mb-3 uppercase tracking-wider">
              Confidence Heatmap
            </p>
            <div className="space-y-3">
              {heatmapFields.map((item, i) => (
                <div key={item.field}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-mono text-slate-300">{item.field}</span>
                    <span className="text-xs font-mono text-slate-400">{item.confidence}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${barColor(item.confidence)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.confidence}%` }}
                      transition={{
                        duration: prefersReduced ? 0 : 1.2,
                        delay: prefersReduced ? 0 : 0.6 + i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mt-5 w-full max-w-2xl">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="rounded-xl bg-slate-800/80 backdrop-blur border border-white/5 p-3 text-center hover:-translate-y-1 transition-transform"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: prefersReduced ? 0 : 0.8 + i * 0.1, duration: 0.4 }}
          >
            <p className={`text-lg sm:text-xl font-mono font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[11px] font-mono text-slate-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
