import WindowPanel from "@/components/WindowPanel";
import SectionHeader from "@/components/SectionHeader";
import { Cpu, PenTool, FlaskConical, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import { Area, AreaChart, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/* ── Map ───────────────────────────────────────────────────────────── */
const map = new DottedMap({ height: 55, grid: "diagonal" });
const points = map.getPoints();

const WorldMap = () => (
  <svg viewBox="0 0 120 60" className="w-full h-full text-foreground/20">
    {points.map((point, i) => (
      <circle
        key={i}
        cx={point.x}
        cy={point.y}
        r={0.15}
        fill="currentColor"
      />
    ))}
  </svg>
);

/* ── Chart ─────────────────────────────────────────────────────────── */
const chartConfig = {
  models: { label: "Models Shipped", color: "hsl(var(--primary))" },
  prototypes: { label: "Prototypes", color: "hsl(var(--accent))" },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", models: 3, prototypes: 5 },
  { month: "Feb", models: 5, prototypes: 8 },
  { month: "Mar", models: 4, prototypes: 6 },
  { month: "Apr", models: 8, prototypes: 12 },
  { month: "May", models: 6, prototypes: 9 },
  { month: "Jun", models: 10, prototypes: 16 },
];

const MonitoringChart = () => (
  <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
    <AreaChart data={chartData}>
      <defs>
        <linearGradient id="fillModels" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="fillPrototypes" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
          <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid
        vertical={false}
        strokeDasharray="3 3"
        stroke="hsl(var(--border))"
      />
      <Area
        dataKey="prototypes"
        type="natural"
        fill="url(#fillPrototypes)"
        stroke="hsl(var(--accent))"
        strokeWidth={2}
        stackId="a"
      />
      <Area
        dataKey="models"
        type="natural"
        fill="url(#fillModels)"
        stroke="hsl(var(--primary))"
        strokeWidth={2}
        stackId="a"
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="dot" />}
      />
    </AreaChart>
  </ChartContainer>
);

/* ── Section ───────────────────────────────────────────────────────── */
const ServicesSection = () => {
  return (
    <WindowPanel title="services.config" id="services" accent="accent" draggable>
      <SectionHeader
        title={
          <>
            What I <span className="text-gradient">Offer</span>
          </>
        }
        subtitle="Tailored solutions at the intersection of AI and UX."
      />

      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-5 sm:gap-4">
        {/* ── Card 1: AI Engineering (wide) ─────────────────── */}
        <div className="sm:col-span-3 rounded-xl border border-border bg-card/60 p-5 sm:p-6 flex flex-col justify-between min-h-[260px] overflow-hidden relative group">
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="icon-badge">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary tracking-wide uppercase">
                AI Engineering
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              End-to-end ML model development. From data pipelines and custom training to production deployment with MLOps.
            </p>
          </div>

          <div className="relative z-0 mt-4 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 h-[140px] opacity-60 group-hover:opacity-90 transition-opacity">
            <WorldMap />
          </div>

          <div className="absolute bottom-4 left-5 sm:left-6 z-10">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Deployed across 3 cloud regions
            </div>
          </div>
        </div>

        {/* ── Card 2: UX Consulting ────────────────────────── */}
        <div className="sm:col-span-2 rounded-xl border border-border bg-card/60 p-5 sm:p-6 flex flex-col min-h-[260px]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="icon-badge">
              <PenTool className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-mono text-primary tracking-wide uppercase">
              UX Consulting
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            Human-centered design for AI products — interfaces that make complex tech feel simple.
          </p>

          {/* Chat bubble mockup */}
          <div className="flex-1 flex flex-col justify-end gap-2.5">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px]">🧑‍💻</span>
              </div>
              <div className="rounded-lg rounded-tl-none border border-border bg-muted/50 px-3 py-2">
                <p className="text-xs text-foreground/80">
                  Users keep dropping off at the onboarding step…
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 justify-end">
              <div className="rounded-lg rounded-tr-none border border-primary/20 bg-primary/5 px-3 py-2">
                <p className="text-xs text-foreground/80">
                  Let's run a heuristic audit and simplify the flow to 3 steps.
                </p>
                <span className="text-[10px] text-muted-foreground mt-1 block text-right">
                  Just now
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Card 3: Uptime / Reliability ─────────────────── */}
        <div className="sm:col-span-2 rounded-xl border border-border bg-card/60 p-5 sm:p-6 flex flex-col items-center justify-center min-h-[140px]">
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-3xl sm:text-4xl font-bold font-mono text-primary"
          >
            99.9%
          </motion.p>
          <p className="text-sm text-muted-foreground mt-1">Model Uptime SLA</p>
        </div>

        {/* ── Card 4: Activity / Research & Testing (wide) ── */}
        <div className="sm:col-span-3 rounded-xl border border-border bg-card/60 p-5 sm:p-6 flex flex-col min-h-[260px]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="icon-badge">
              <FlaskConical className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-mono text-primary tracking-wide uppercase">
              Research & Testing
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            User research, A/B testing, and data analysis to validate design and AI decisions.
          </p>

          <div className="flex-1 mt-3 min-h-[120px]">
            <MonitoringChart />
          </div>
        </div>

        {/* ── Card 5: AI Prototyping (full width) ──────────── */}
        <div className="sm:col-span-5 rounded-xl border border-border bg-card/60 p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center min-h-[120px]">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="icon-badge-accent">
              <Zap className="w-5 h-5 text-accent" />
            </div>
            <span className="text-xs font-mono text-accent tracking-wide uppercase">
              AI Prototyping
            </span>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed flex-1">
            Rapid prototypes that bring AI concepts to life — interactive proof-of-concept demos, LLM-powered feature prototypes, and technical feasibility assessments in 1–2 weeks.
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-muted/40 px-3 py-1.5 text-xs font-mono text-foreground/70">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span>12 prototypes shipped</span>
            </div>
          </div>
        </div>
      </div>
    </WindowPanel>
  );
};

export default ServicesSection;
