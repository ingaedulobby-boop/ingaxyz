import { motion, useMotionValue, useSpring, useReducedMotion, useTransform } from "framer-motion";
import React, { ReactNode, useState, useRef, useCallback, useEffect } from "react";
import clsx from "clsx";
import { Minus, Maximize2, Minimize2, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowManager } from "@/components/window-system/WindowManagerContext";

const GRID_SIZE = 16;
const snapToGrid = (v: number) => Math.round(v / GRID_SIZE) * GRID_SIZE;

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
}: WindowPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { minimizeWindow, restoreWindow, isMinimized } = useWindowManager();

  const minimized = isMinimized(id);

  const [isMaximized, setIsMaximized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // =============================
  // Dragging
  // =============================
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 28 });
  const springY = useSpring(y, { stiffness: 320, damping: 28 });

  const canDrag = draggable && !isMaximized && !isMobile;

  const handleDragEnd = useCallback(() => {
    x.set(snapToGrid(x.get()));
    y.set(snapToGrid(y.get()));
  }, [x, y]);

  // =============================
  // Keyboard
  // =============================
  useEffect(() => {
    if (!isFocused) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMaximized) {
          setIsMaximized(false);
        } else {
          setIsClosed(true);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFocused, isMaximized]);

  // =============================
  // 3D Tilt
  // =============================
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || isMaximized || isMobile) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      rotateX.set(-relY * 6);
      rotateY.set(relX * 6);
    },
    [prefersReducedMotion, isMaximized, isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setIsFocused(false);
  }, []);

  const shadowX = useTransform(springRotateY, [-6, 6], [14, -14]);
  const shadowY = useTransform(springRotateX, [-6, 6], [-14, 14]);

  const shadowBlur = useTransform(
    [springRotateX, springRotateY],
    ([rx, ry]) => 28 + Math.abs(rx) * 2 + Math.abs(ry) * 2,
  );

  const dynamicShadow = useTransform(
    [shadowX, shadowY, shadowBlur],
    ([sx, sy, blur]) => `${sx}px ${sy}px ${blur}px -10px hsl(var(--foreground)/0.12)`,
  );

  if (isClosed) return null;

  const accentColor = accent === "primary" ? "text-primary" : "text-accent";

  return (
    <motion.section
      ref={containerRef}
      id={id}
      role="region"
      aria-labelledby={`${id}-title`}
      tabIndex={0}
      drag={canDrag}
      dragMomentum={false}
      onDragEnd={canDrag ? handleDragEnd : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsFocused(true)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 50, scale: 0.97 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      animate={minimized ? { scale: 0.92, opacity: 0 } : { scale: 1, opacity: 1 }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        rotateX: prefersReducedMotion || isMobile ? 0 : springRotateX,
        rotateY: prefersReducedMotion || isMobile ? 0 : springRotateY,
        boxShadow: prefersReducedMotion || isMobile ? undefined : dynamicShadow,
        x: canDrag ? springX : undefined,
        y: canDrag ? springY : undefined,
      }}
      className={clsx(
        "relative w-full rounded-2xl border border-border bg-card/80 overflow-hidden outline-none",
        "transition-[border-color,box-shadow] duration-300 will-change-transform",
        isFocused && "ring-1 ring-primary/30",
        isMobile && "shadow-lg",
        isMaximized && "fixed inset-4 z-50 rounded-2xl",
        className,
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-3 border-b border-border bg-window-header/60 backdrop-blur-md",
          canDrag && "cursor-grab active:cursor-grabbing",
        )}
      >
        <div className="flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsClosed(true);
              }}
              aria-label="Close"
              className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimized ? restoreWindow(id) : minimizeWindow(id, title);
              }}
              aria-label="Minimize"
              className="w-3 h-3 rounded-full bg-warning/80 hover:bg-warning"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((v) => !v);
              }}
              aria-label="Maximize"
              className="w-3 h-3 rounded-full bg-success/80 hover:bg-success"
            />
          </div>

          <h2 id={`${id}-title`} className={clsx("text-xs font-mono tracking-wide truncate", accentColor)}>
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate={{
          height: minimized ? 0 : "auto",
          opacity: minimized ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-6 relative z-10 text-sm sm:text-base">{children}</div>
      </motion.div>
    </motion.section>
  );
}
