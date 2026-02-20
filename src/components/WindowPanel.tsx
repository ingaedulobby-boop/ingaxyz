"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { ReactNode, useState } from "react";
import clsx from "clsx";

export type WindowAccent = "primary" | "accent";

export interface WindowPanelProps {
  title: string;
  id: string;
  children: ReactNode;
  className?: string;
  accent?: WindowAccent;
}

export default function WindowPanel({
  title,
  id,
  children,
  className,
  accent = "primary",
}: WindowPanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  const accentColor =
    accent === "primary" ? "text-primary" : "text-accent";

  return (
    <motion.section
      id={id}
      role="region"
      aria-labelledby={`${id}-title`}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              rotateX: 4,
              rotateY: -4,
              scale: 1.02,
            }
      }
      whileTap={
        prefersReducedMotion
          ? undefined
          : { scale: 0.98 }
      }
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      className={clsx(
        "relative w-full",
        "rounded-2xl",
        "border border-white/10",
        "backdrop-blur-xl",
        "bg-white/5 dark:bg-white/5",
        "shadow-xl",
        "transition-all duration-300",
        "will-change-transform",
        "overflow-hidden",
        className
      )}
    >
      {/* 3D Glow Layer */}
      <div
        className={clsx(
          "absolute inset-0 pointer-events-none transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-0",
          "bg-gradient-to-br from-white/10 via-transparent to-white/5"
        )}
      />

      {/* Header */}
      <div
        className={clsx(
          "flex items-center justify-between",
          "px-4 sm:px-6",
          "py-3",
          "bg-black/20",
          "border-b border-white/10",
          "backdrop-blur-md"
        )}
      >
        <div className="flex items-center gap-2">
          {/* macOS window dots */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
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
      <div
        className={clsx(
          "p-4 sm:p-6 md:p-8",
          "text-sm sm:text-base",
          "relative z-10"
        )}
      >
        {children}
      </div>
    </motion.section>
  );
}
