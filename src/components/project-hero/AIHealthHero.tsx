import { motion, useReducedMotion } from "framer-motion";
import { useState, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";

function generateNetwork(nodeCount: number, seed: number) {
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + seed;
    const radius = 100 + ((i * 41 + seed * 17) % 90);
    nodes.push({
      x: 250 + Math.cos(angle) * radius + ((i * 29) % 50) - 25,
      y: 200 + Math.sin(angle) * radius + ((i * 19) % 40) - 20,
    });
  }
  const edges: { from: number; to: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 150) edges.push({ from: i, to: j });
    }
  }
  return { nodes, edges };
}

function NeuralNetworkSVG() {
  const prefersReduced = useReducedMotion();
  const { nodes, edges } = useMemo(() => generateNetwork(12, 7), []);
  return (
    <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10]" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice">
      {edges.map((e, i) => (
        <motion.line key={`e${i}`} x1={nodes[e.from].x} y1={nodes[e.from].y} x2={nodes[e.to].x} y2={nodes[e.to].y} stroke="rgb(34,211,238)" strokeWidth={0.7}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 1.5, delay: prefersReduced ? 0 : 0.4 + i * 0.05, ease: "easeOut" }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={`n${i}`} cx={n.x} cy={n.y} r={2} fill="rgb(34,211,238)"
          initial={{ scale: 0, opacity: 0 }} animate={prefersReduced ? { scale: 1, opacity: 1 } : { scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.2 + i * 0.07 }} />
      ))}
      {!prefersReduced && edges.slice(0, 4).map((e, i) => (
        <motion.circle key={`p${i}`} r={1.2} fill="rgb(34,211,238)" initial={{ opacity: 0 }}
          animate={{ cx: [nodes[e.from].x, nodes[e.to].x], cy: [nodes[e.from].y, nodes[e.to].y], opacity: [0, 0.7, 0] }}
          transition={{ duration: 2.5, delay: 2 + i * 1.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }} />
      ))}
    </svg>
  );
}

const metrics = [
  { label: "Heart Rate", value: "72 bpm", color: "text-cyan-400" },
  { label: "SpO₂", value: "98%", color: "text-green-400" },
  { label: "Sleep Score", value: "87", color: "text-yellow-400" },
  { label: "Stress", value: "Low", color: "text-rose-400" },
];

const stats = [
  { label: "User Engagement", value: "+72%", color: "text-cyan-400" },
  { label: "App Store Rating", value: "4.8★", color: "text-green-400" },
  { label: "Daily Users", value: "15K+", color: "text-yellow-400" },
  { label: "Anxiety Reduction", value: "38%", color: "text-rose-400" },
];

export default function AIHealthHero() {
  const { ref, y } = useParallax(0.3);
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className="relative h-[50vh] min-h-[400px] overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Neural network background */}
      <NeuralNetworkSVG />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Pulse ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-cyan-400/20 hidden md:block pointer-events-none"
        animate={prefersReduced ? {} : { scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dashboard card with 3D tilt */}
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-6 sm:p-8 shadow-[0_0_80px_rgba(34,211,238,0.15)] hero-parallax-layer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        style={{
          transform: prefersReduced
            ? undefined
            : `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <h3 className="text-lg sm:text-xl font-mono font-semibold text-slate-100 mb-5">
          AI Health Companion
        </h3>

        <div className="space-y-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: prefersReduced ? 0 : 0.3 + i * 0.15, duration: 0.5 }}
            >
              <span className={`text-sm font-mono ${m.color}`}>{m.label}</span>
              <span className="text-sm font-mono font-bold text-slate-100">{m.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 w-full max-w-2xl">
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
