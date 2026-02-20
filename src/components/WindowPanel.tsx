import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import React, { ReactNode, useState, useRef, useCallback } from "react";
import clsx from "clsx";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const GRID_SIZE = 16; // snap grid in px
const snapToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

export type WindowAccent = "primary" | "accent";

export interface WindowPanelProps {
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  accent?: WindowAccent;
  draggable?: boolean;
  defaultPosition?: { x: number; y: number };
}

export default function WindowPanel({
  title,
  id,
  children,
  className,
  accent = "primary",
  draggable = false,
  defaultPosition,
}: WindowPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Snap position values for grid snapping on drag end
  const snapX = useMotionValue(0);
  const snapY = useMotionValue(0);
  const springX = useSpring(snapX, { stiffness: 300, damping: 25 });
  const springY = useSpring(snapY, { stiffness: 300, damping: 25 });

  const canDrag = draggable && !isMaximized && !isMobile;

  const handleDragEnd = useCallback(
    (_: any, info: { offset: { x: number; y: number } }) => {
      const snappedX = snapToGrid(snapX.get() + info.offset.x);
      const snappedY = snapToGrid(snapY.get() + info.offset.y);
      setIsSnapping(true);
      snapX.set(snappedX);
      snapY.set(snappedY);
      setTimeout(() => setIsSnapping(false), 300);
    },
    [snapX, snapY]
  );

  // Mouse-based 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || isMaximized) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(-y * 8);
      rotateY.set(x * 8);
    },
    [prefersReducedMotion, isMaximized, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  if (isClosed) return null;

  const accentColor = accent === "primary" ? "text-primary" : "text-accent";

  return (
    <motion.section
      ref={containerRef}
      id={id}
      role="region"
      aria-labelledby={`${id}-title`}
      drag={canDrag}
      dragMomentum={false}
      dragElastic={0.05}
      dragSnapToOrigin={false}
      onDragEnd={canDrag ? handleDragEnd : undefined}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
        rotateX: prefersReducedMotion ? 0 : springRotateX,
        rotateY: prefersReducedMotion ? 0 : springRotateY,
        x: canDrag ? springX : undefined,
        y: canDrag ? springY : undefined,
      }}
      className={clsx(
        "relative w-full",
        "rounded-2xl",
        "border border-border",
        "backdrop-blur-xl",
        "bg-card/80",
        "shadow-xl window-shadow",
        "transition-all duration-300",
        "will-change-transform",
        "overflow-hidden",
        isMaximized && "!fixed !inset-4 !z-50 !rounded-2xl",
        className
      )}
    >
      {/* Glow layer on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Header / Title bar */}
      <div
        className={clsx(
          "flex items-center justify-between",
          "px-4 sm:px-6",
          "py-3",
          "bg-window-header/60",
          "border-b border-border",
          "backdrop-blur-md",
          canDrag && "cursor-grab active:cursor-grabbing"
        )}
      >
        <div className="flex items-center gap-2">
          {/* Window control dots */}
          <div className="flex gap-1.5">
            <button
              onClick={() => setIsClosed(true)}
              className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive transition-colors group relative"
              aria-label="Close window"
            >
              <X className="w-2 h-2 absolute inset-0.5 text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="w-3 h-3 rounded-full bg-yellow-400/80 hover:bg-yellow-400 transition-colors group relative"
              aria-label={isMinimized ? "Restore window" : "Minimize window"}
            >
              <Minus className="w-2 h-2 absolute inset-0.5 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => setIsMaximized((v) => !v)}
              className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors group relative"
              aria-label={isMaximized ? "Restore window" : "Maximize window"}
            >
              {isMaximized ? (
                <Minimize2 className="w-2 h-2 absolute inset-0.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Maximize2 className="w-2 h-2 absolute inset-0.5 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>

          <h2
            id={`${id}-title`}
            className={clsx(
              "ml-3 text-sm sm:text-base font-mono tracking-wide",
              accentColor
            )}
          >
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate={{
          height: isMinimized ? 0 : "auto",
          opacity: isMinimized ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div
          className={clsx(
            "p-4 sm:p-6 md:p-8",
            "text-sm sm:text-base",
            "relative z-10"
          )}
        >
          {children}
        </div>
      </motion.div>
    </motion.section>
  );
}
