import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useParallax } from "@/hooks/useParallax";

const wcagChecks = [
  { label: "Color Contrast", status: "AAA", pass: true, fix: "All text meets 7:1 ratio — no action needed." },
  { label: "Alt Text", status: "2 missing", pass: false, fix: "Add descriptive alt to hero image and team photo." },
  { label: "Focus Order", status: "Pass", pass: true, fix: "Tab order follows logical reading sequence." },
  { label: "ARIA Labels", status: "1 warning", pass: false, fix: "Add aria-label to icon-only navigation button." },
  { label: "Heading Hierarchy", status: "Pass", pass: true, fix: "H1→H2→H3 hierarchy is correct throughout." },
];

const contrastPairs = [
  { fg: "#FFFFFF", bg: "#1a1a2e", ratio: "12.6:1", level: "AAA" },
  { fg: "#6366f1", bg: "#0f172a", ratio: "4.8:1", level: "AA" },
  { fg: "#94a3b8", bg: "#1e293b", ratio: "3.1:1", level: "Fail" },
];

const stats = [
  { label: "Issues Found", value: "14", color: "text-amber-400" },
  { label: "WCAG Score", value: "92%", color: "text-green-400" },
  { label: "Pages Audited", value: "48", color: "text-cyan-400" },
  { label: "Auto-Fixed", value: "11", color: "text-emerald-400" },
];

function generateNetwork(nodeCount: number, seed: number) {
  const nodes: { x: number; y: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 + seed;
    const radius = 110 + ((i * 31 + seed * 11) % 85);
    nodes.push({
      x: 250 + Math.cos(angle) * radius + ((i * 23) % 45) - 22,
      y: 200 + Math.sin(angle) * radius + ((i * 17) % 35) - 17,
    });
  }
  const edges: { from: number; to: number }[] = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 155) edges.push({ from: i, to: j });
    }
  }
  return { nodes, edges };
}

function NeuralNetworkSVG() {
  const prefersReduced = useReducedMotion();
  const { nodes, edges } = useMemo(() => generateNetwork(13, 5), []);
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.10]" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid slice">
      {edges.map((e, i) => (
        <motion.line key={`e${i}`} x1={nodes[e.from].x} y1={nodes[e.from].y} x2={nodes[e.to].x} y2={nodes[e.to].y} stroke="rgb(34,197,94)" strokeWidth={0.7}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 1.5, delay: prefersReduced ? 0 : 0.4 + i * 0.04 }} />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={`n${i}`} cx={n.x} cy={n.y} r={2.2} fill="rgb(34,197,94)"
          initial={{ scale: 0, opacity: 0 }} animate={prefersReduced ? { scale: 1, opacity: 1 } : { scale: [0, 1.2, 1], opacity: [0, 1, 0.7] }}
          transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.2 + i * 0.06 }} />
      ))}
      {!prefersReduced && edges.slice(0, 4).map((e, i) => (
        <motion.circle key={`p${i}`} r={1.3} fill="rgb(34,197,94)" initial={{ opacity: 0 }}
          animate={{ cx: [nodes[e.from].x, nodes[e.to].x], cy: [nodes[e.from].y, nodes[e.to].y], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3, delay: 2 + i * 1.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} />
      ))}
    </svg>
  );
}

function levelColor(level: string) {
  if (level === "AAA") return "text-green-400";
  if (level === "AA") return "text-amber-400";
  return "text-rose-400";
}

export default function AccessibilityHero() {
  const { ref, y } = useParallax(0.3);
  const prefersReduced = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Neural network background */}
      <NeuralNetworkSVG />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-green-500/10 blur-3xl pointer-events-none" />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/40 to-transparent hidden md:block pointer-events-none z-20"
        animate={{ top: ["18%", "82%", "18%"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main glassmorphism card */}
      <motion.div
        className="relative z-10 w-full max-w-2xl rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-5 sm:p-7 shadow-[0_0_60px_rgba(34,197,94,0.12)]"
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
          Accessibility Audit Tool
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WCAG Checklist */}
          <div className="space-y-1.5">
            <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">WCAG Checklist</p>
            {wcagChecks.map((c, i) => (
              <motion.div
                key={c.label}
                className="group relative px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/10 transition-colors cursor-default"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.3 + i * 0.08, duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${c.pass ? "bg-green-400" : "bg-amber-400"}`} />
                    <span className="text-xs font-mono text-slate-200">{c.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${c.pass ? "text-green-400" : "text-amber-400"}`}>
                    {c.status}
                  </span>
                </div>
                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-300 ease-out">
                  <p className={`text-[10px] font-mono mt-1.5 ${c.pass ? "text-slate-400" : "text-amber-300/70"}`}>
                    💡 {c.fix}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contrast Checker + Screen Reader */}
          <div className="space-y-3">
            {/* Contrast Checker */}
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-3">Contrast Checker</p>
              <div className="space-y-2.5">
                {contrastPairs.map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReduced ? 0 : 0.5 + i * 0.15, duration: 0.5 }}
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-sm border border-white/10" style={{ backgroundColor: p.fg }} />
                      <div className="w-4 h-4 rounded-sm border border-white/10" style={{ backgroundColor: p.bg }} />
                    </div>
                    <span className="text-[11px] font-mono text-slate-300 flex-1">{p.ratio}</span>
                    <span className={`text-[10px] font-mono font-bold ${levelColor(p.level)}`}>{p.level}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Screen Reader Simulation */}
            <motion.div
              className="rounded-xl bg-white/[0.03] border border-white/5 p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReduced ? 0 : 0.9, duration: 0.5 }}
            >
              <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Screen Reader</p>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-400"
                  animate={prefersReduced ? {} : { opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.span
                  className="text-[11px] font-mono text-slate-300 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: prefersReduced ? 0 : 1.2 }}
                >
                  "Navigation, main menu, 5 items"
                </motion.span>
              </div>
            </motion.div>
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
