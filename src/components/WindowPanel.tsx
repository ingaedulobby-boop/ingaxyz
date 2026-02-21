import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import React, { ReactNode, useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowManager } from "@/components/window-system/WindowManagerContext";

export type WindowAccent = "primary" | "accent";

export interface WindowPanelProps {
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  accent?: WindowAccent;
  draggable?: boolean;
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
  // Simple Drag (Lovable Safe)
  // =============================
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 30 });
  const springY = useSpring(y, { stiffness: 250, damping: 30 });

  const canDrag = draggable && !isMobile && !isMaximized;

  // =============================
  // ESC Key Support
  // =============================
  useEffect(() => {
    if (!isFocused) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMaximized) setIsMaximized(false);
        else setIsClosed(true);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFocused, isMaximized]);

  if (isClosed) return null;

  const accentColor = accent === "primary" ? "text-primary" : "text-accent";

  return (
    <motion.section
      ref={containerRef}
      id={id}
      tabIndex={0}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      drag={canDrag}
      dragMomentum={false}
      style={{
        x: canDrag ? springX : undefined,
        y: canDrag ? springY : undefined,
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
      animate={{
        opacity: minimized ? 0 : 1,
        scale: minimized ? 0.95 : 1,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx(
        "relative w-full rounded-2xl border border-border bg-card/90 backdrop-blur-xl overflow-hidden",
        "transition-all duration-300 outline-none",
        isFocused && "ring-1 ring-primary/30",
        isMaximized && "fixed inset-4 z-50",
        className,
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50 backdrop-blur-md",
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
              className="w-3 h-3 rounded-full bg-destructive hover:opacity-80"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                minimized ? restoreWindow(id) : minimizeWindow(id, title);
              }}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:opacity-80"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMaximized((v) => !v);
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:opacity-80"
            />
          </div>

          <h2 className={clsx("text-xs font-mono tracking-wide truncate", accentColor)}>{title}</h2>
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
        <div className="p-6 text-sm sm:text-base">{children}</div>
      </motion.div>
    </motion.section>
  );
}
