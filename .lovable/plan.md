

# Add Subtle Mobile Parallax

## Summary
Enable a gentle parallax effect on mobile devices instead of fully disabling it. This applies to both the hero section and the shared `useParallax` hook used by project hero components.

## Changes

### 1. `src/components/sections/HeroSection.tsx` (lines 35-44)

Update the parallax transform ranges to use reduced values on mobile instead of zero:

- **`bgY`**: Change mobile range from `["0%", "0%"]` to `["0%", "10%"]`
- **`contentY`**: Change mobile range from `["0%", "0%"]` to `["0%", "5%"]`
- `prefersReducedMotion` still fully disables parallax (accessibility preserved)

### 2. `src/hooks/useParallax.ts`

This hook is used by `AIHealthHero`, `SmartParserHero`, and `AccessibilityHero`. Currently it applies full parallax on all devices. Update it to:

- Detect mobile viewport (same 640px breakpoint)
- Detect `prefers-reduced-motion`
- Use `speed * 0.33` multiplier on mobile (roughly 1/3 of desktop movement)
- Disable entirely for reduced motion

## Technical Details

- No new dependencies required
- Mobile detection reuses the same `window.innerWidth < 640` pattern already in `HeroSection`
- The `useParallax` hook will add `useReducedMotion` from Framer Motion and a `useState`/`useEffect` for the mobile check
- Output range on mobile: `[0, speed * 66]` vs desktop `[0, speed * 200]` -- a subtle, gentle effect

