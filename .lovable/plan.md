

# Upgrade AIHealthHero to 3D Glassmorphism Dashboard

## Summary
Replace the current image-based AIHealthHero with a fully animated, interactive 3D dashboard component. This creates a cyber-glassmorphism aesthetic with mouse-driven tilt, floating metric cards with pulse animations, a radial glow aura, and stat cards at the bottom -- all built with Framer Motion and Tailwind, no external images needed.

## What Changes

### 1. Rewrite `src/components/project-hero/AIHealthHero.tsx`

Replace the current image + floating labels approach with an inline 3D dashboard visual:

**New features:**
- Mouse-position-driven 3D tilt (rotateX/rotateY) with perspective, disabled on mobile and reduced-motion
- Central glassmorphism dashboard card with `backdrop-blur-xl bg-white/5 border-white/10` styling
- Animated radial cyan glow behind the card (`shadow-[0_0_80px_rgba(34,211,238,0.25)]`)
- Four health metric rows inside the card with color-coded labels (cyan, green, yellow, rose) and staggered fade-in
- Four stat cards at the bottom (+72%, 4.8 star, 15K+, 38%) with hover lift effect
- Animated pulse ring behind the dashboard (existing behavior, improved)
- Parallax still applied to the outer container via the existing `useParallax` hook

**Visual design:**
- Dark gradient background (`from-slate-900 to-slate-950`) that works in both themes
- Glass panel: `rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10`
- Metric colors: Heart Rate = cyan-400, SpO2 = green-400, Sleep = yellow-400, Stress = rose-400
- Stat cards: same color mapping, `bg-slate-800/80 backdrop-blur` with shadow

**Animation details:**
- Dashboard card: `initial={{ opacity: 0, scale: 0.9 }}` -> `animate={{ opacity: 1, scale: 1 }}` with spring
- Each metric row: staggered `delay: i * 0.15`, fade + slide from left
- Stat cards: staggered `delay: 0.8 + i * 0.1`, scale from 0.9
- Tilt: calculated from mouse position relative to container center, divided by 25 for subtlety
- Tilt resets to `{ x: 0, y: 0 }` on mouse leave with spring transition
- All motion disabled when `prefers-reduced-motion` is active

**Responsive behavior:**
- On mobile (< 768px): tilt disabled, stat cards stack 2x2, metrics use smaller text
- Dashboard card max-width constrained (`max-w-lg`) and centered
- Container keeps `h-[50vh] min-h-[400px]` to match other project heroes

### 2. No other files change

- `useParallax` hook already works correctly
- `ProjectDetail.tsx` already imports and renders `AIHealthHero`
- No new dependencies needed (Framer Motion already installed)
- Dark/light theme compatible via CSS variable colors + explicit dark palette on the hero

## Technical Details

- Removes dependency on `hero-health.jpg` image for this component (image file stays in assets for other potential uses)
- Uses `useState` for tilt tracking, `onMouseMove` / `onMouseLeave` on the outer container
- Mobile detection via `window.innerWidth < 768` with resize listener (same pattern as existing components)
- `useReducedMotion()` from Framer Motion gates all animation
- The `useParallax` hook is still called and applied to the container for scroll-driven parallax on the whole section

