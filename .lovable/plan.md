
# Upgrade SmartParserHero to Enterprise 3D Glassmorphism Dashboard

## Summary
Replace the image-based SmartParserHero with an interactive, enterprise-grade ML control panel. This creates a structured, industrial aesthetic with a file list panel, animated confidence heatmap, OCR scanning line, grid overlay, and stat cards -- all inline with Framer Motion and Tailwind. Deliberately contrasts the soft/empathetic Health Companion with a powerful, data-dense feel.

## Visual Design Direction
- Dark industrial palette (`from-slate-900 to-slate-950`) matching Health Companion container style
- Glassmorphism main card (`backdrop-blur-xl bg-white/5 border-white/10`) with a subtle violet/cyan enterprise glow
- Subtle grid overlay (`bg-[linear-gradient(...)]`) for ML lab atmosphere
- Color palette: emerald (high confidence), cyan (accuracy), purple (enterprise), amber (throughput)
- No external images -- fully self-contained

## What Changes

### 1. Rewrite `src/components/project-hero/SmartParserHero.tsx`

**Layout (two-column on desktop, stacked on mobile):**
- Left panel: File list with 3 document items (Invoice, Contract, Report). Each has hover highlight animation with a `layoutId` shared element for the active indicator bar
- Right panel: Confidence heatmap -- 3 extraction fields (Invoice Total 96%, Vendor Name 88%, Due Date 73%) with animated width bars color-coded by confidence level (green > 90%, amber > 80%, red otherwise)

**Bottom section: 4 stat cards**
- Processing Time: -90% (emerald)
- Extraction Accuracy: 96% (cyan)
- Enterprise Clients: 3 (purple)
- Documents/Day: 2,000+ (amber)
- Hover lift effect (`whileHover={{ y: -4 }}`)

**OCR scanning line (preserved):**
- Horizontal gradient line animating vertically across the component, same as current but on the glassmorphism card

**Grid overlay:**
- Absolute-positioned div with CSS linear-gradient grid pattern at 40px spacing, low opacity, for industrial texture

**Animations:**
- Main card: fade + slide up from `y: 40`, spring transition
- File items: staggered fade-in with `delay: i * 0.1`
- Heatmap bars: animate width from 0 to confidence percentage over 1.2s with staggered delays
- Stat cards: staggered scale from 0.9, same pattern as Health Companion
- All gated by `useReducedMotion` -- skips delays and complex motion when active

**Mouse-driven 3D tilt:**
- Same pattern as AIHealthHero: `rotateX`/`rotateY` from mouse position, `perspective(1000px)`, disabled on mobile and reduced-motion
- Applied to the main glassmorphism card

**Responsive behavior:**
- Mobile (< 768px): single column layout, tilt disabled, smaller text, 2x2 stat grid
- Desktop: two-column file list + heatmap, 4-column stats
- Container keeps `h-[50vh] min-h-[400px]` to match other heroes

**Integration:**
- Keeps `useParallax(0.3)` on outer container for scroll parallax
- No changes to any other files
- No new dependencies

## Technical Details
- Removes dependency on `hero-document.jpg` image (file stays in assets)
- Uses `useState` for tilt and hovered file index
- Mobile detection via `window.innerWidth < 768` + resize listener
- `useReducedMotion()` from Framer Motion gates all animation
- File hover uses `onHoverStart`/`onHoverEnd` from Framer Motion
- Heatmap bar colors computed inline based on confidence threshold
