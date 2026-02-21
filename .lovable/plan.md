

# Upgrade Carousel with Autoplay, Dots, Progress Bar, and 3D Hover

## Summary
Enhance the existing shadcn carousel component with autoplay, dot indicators, a scroll progress bar, responsive slide counts (1 on mobile / 3 on desktop), and a subtle 3D hover effect on slides. The carousel is not currently used by any other component, so this is a safe, zero-breaking-change upgrade.

## Changes

### 1. Install `embla-carousel-autoplay`
Add the autoplay plugin dependency.

### 2. Rewrite `src/components/ui/carousel.tsx`
Replace the current carousel with an upgraded version that keeps the existing composable API (Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext) and adds:

**New features:**
- **Autoplay**: 4-second delay, pauses on hover, stops on user interaction
- **Loop mode**: Infinite scrolling enabled
- **Dot indicators**: New `CarouselDots` component -- animated active dot (wider), clickable to jump to slide
- **Scroll progress bar**: New `CarouselProgress` component -- thin bar showing exact scroll position via `api.scrollProgress()`
- **`selectedIndex` and `scrollSnaps`** exposed in context for dots
- **`progress`** exposed in context for the progress bar

**Preserved features:**
- Composable sub-components (CarouselContent, CarouselItem, CarouselPrevious, CarouselNext)
- Horizontal + vertical orientation support
- Keyboard navigation (arrow keys)
- `opts`, `plugins`, `setApi` props
- Proper event cleanup (select, reInit, scroll)
- All existing exports maintained

**Styling updates:**
- Arrow buttons repositioned to work on mobile (inside the container instead of `-left-12` / `-right-12`)
- CarouselItem keeps `basis-full` default but consumers can override with `md:basis-1/3` via className
- Subtle 3D hover transform on slides: `hover:scale-[1.02]` with `transition-transform` and `transform-gpu`

### 3. Export new components
Add `CarouselDots` and `CarouselProgress` to the export list so they can be optionally used by consumers.

## Technical Details
- `embla-carousel-autoplay` is the official Embla plugin, compatible with the installed `embla-carousel-react` version
- Autoplay ref created once and passed to `useEmblaCarousel` plugins array
- `onMouseEnter` / `onMouseLeave` on the viewport div control autoplay pause/resume
- The `scroll` event from Embla drives the progress bar via `api.scrollProgress()`
- No changes to any other files -- this is a self-contained component upgrade
- All existing sub-component APIs remain backward-compatible

