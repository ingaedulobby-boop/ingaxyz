import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  autoplay?: boolean;
  centerMode?: boolean;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  progress: number;
  scrollTo: (index: number) => void;
  slideStyles: Array<{ scale: number; parallaxX: number }>;
  centerMode: boolean;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      plugins: externalPlugins,
      setApi,
      autoplay = false,
      centerMode = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const autoplayPlugin = React.useRef(
      Autoplay({ delay: 4000, stopOnInteraction: true }),
    );

    const allPlugins = React.useMemo(() => {
      const base = autoplay ? [autoplayPlugin.current] : [];
      if (externalPlugins) return [...base, ...externalPlugins];
      return base.length > 0 ? base : undefined;
    }, [autoplay, externalPlugins]);

    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      allPlugins,
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
    const [progress, setProgress] = React.useState(0);
    const [slideStyles, setSlideStyles] = React.useState<
      Array<{ scale: number; parallaxX: number }>
    >([]);

    const computeSlideStyles = React.useCallback(
      (api: CarouselApi) => {
        if (!api || !centerMode) return;
        const engine = (api as any).internalEngine();
        const scrollProgress = api.scrollProgress();
        const styles = api.scrollSnapList().map((snapPosition, index) => {
          let diffToTarget = snapPosition - scrollProgress;

          // Handle loop wrapping
          engine.slideLooper?.loopPoints?.forEach((loopItem: any) => {
            if (loopItem.index === index) {
              const target = loopItem.target();
              if (Math.abs(target) > 0) {
                diffToTarget = snapPosition + target - scrollProgress;
              }
            }
          });

          const distance = Math.abs(diffToTarget);
          const scale = Math.max(0.85, 1 - distance * 0.3);
          const parallaxX = diffToTarget * -50;

          return { scale, parallaxX };
        });
        setSlideStyles(styles);
      },
      [centerMode],
    );

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setSelectedIndex(api.selectedScrollSnap());
    }, []);

    const onScroll = React.useCallback(
      (api: CarouselApi) => {
        if (!api) return;
        setProgress(Math.max(0, Math.min(1, api.scrollProgress())));
        computeSlideStyles(api);
      },
      [computeSlideStyles],
    );

    const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);
    const scrollTo = React.useCallback(
      (index: number) => api?.scrollTo(index),
      [api],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (orientation === "horizontal") {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            scrollNext();
          }
        } else {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === "ArrowDown") {
            event.preventDefault();
            scrollNext();
          }
        }
      },
      [orientation, scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      setScrollSnaps(api.scrollSnapList());
      onSelect(api);
      onScroll(api);
      computeSlideStyles(api);

      api.on("reInit", onSelect);
      api.on("select", onSelect);
      api.on("scroll", onScroll);
      api.on("reInit", onScroll);

      return () => {
        api.off("select", onSelect);
        api.off("reInit", onSelect);
        api.off("scroll", onScroll);
        api.off("reInit", onScroll);
      };
    }, [api, onSelect, onScroll, computeSlideStyles]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          orientation,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
          progress,
          scrollTo,
          slideStyles,
          centerMode,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index?: number }
>(({ className, index, style, children, ...props }, ref) => {
  const { orientation, slideStyles, centerMode } = useCarousel();

  const itemStyle = React.useMemo(() => {
    if (!centerMode || index === undefined || !slideStyles[index]) {
      return style;
    }
    const { scale } = slideStyles[index];
    return {
      ...style,
      transform: `scale(${scale})`,
      transition: "transform 0.25s ease-out",
    };
  }, [centerMode, index, slideStyles, style]);

  const parallaxStyle = React.useMemo(() => {
    if (!centerMode || index === undefined || !slideStyles[index]) return {};
    const { parallaxX } = slideStyles[index];
    return {
      transform: `translateX(${parallaxX}px)`,
      transition: "transform 0.25s ease-out",
    };
  }, [centerMode, index, slideStyles]);

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full transform-gpu",
        !centerMode && "transition-transform hover:scale-[1.02]",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      style={itemStyle}
      {...props}
    >
      {centerMode ? (
        <div className="overflow-hidden">
          <div style={parallaxStyle}>{children}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "left-2 top-1/2 -translate-y-1/2"
          : "left-1/2 top-2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute z-10 h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "right-2 top-1/2 -translate-y-1/2"
          : "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

function CarouselDots({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  return (
    <div className={cn("flex justify-center gap-2 py-2", className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            index === selectedIndex
              ? "w-6 bg-primary"
              : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
          )}
        />
      ))}
    </div>
  );
}
CarouselDots.displayName = "CarouselDots";

function CarouselProgress({ className }: { className?: string }) {
  const { progress } = useCarousel();

  return (
    <div
      className={cn(
        "mt-2 h-0.5 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
    >
      <div
        className="h-full bg-primary transition-transform duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
CarouselProgress.displayName = "CarouselProgress";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselProgress,
};
