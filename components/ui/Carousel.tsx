"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
} & React.ComponentProps<"div">;

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  orientation: "horizontal" | "vertical";
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within <Carousel />");
  return context;
}

export function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    { ...opts, axis: orientation === "horizontal" ? "x" : "y" },
    plugins
  );

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = React.useCallback(() => api?.scrollNext(), [api]);

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  const orientationClass = orientation === "horizontal" ? "relative" : "relative";

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        orientation,
      }}
    >
      <div className={[orientationClass, className].filter(Boolean).join(" ")} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={["flex", orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col", className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </div>
  );
}

export function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="bild"
      className={[
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CarouselPrevious({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <button
      type="button"
      aria-label="Föregående bild"
      className={[
        "absolute z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-dark/80 text-fg transition hover:border-turquoise/50 hover:text-turquoise disabled:opacity-40",
        orientation === "horizontal"
          ? "left-2 top-1/2 -translate-y-1/2"
          : "left-1/2 top-2 -translate-x-1/2 rotate-90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </button>
  );
}

export function CarouselNext({ className, ...props }: React.ComponentProps<"button">) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      type="button"
      aria-label="Nästa bild"
      className={[
        "absolute z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-navy-dark/80 text-fg transition hover:border-turquoise/50 hover:text-turquoise disabled:opacity-40",
        orientation === "horizontal"
          ? "right-2 top-1/2 -translate-y-1/2"
          : "bottom-2 left-1/2 -translate-x-1/2 rotate-90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={scrollNext}
      disabled={!canScrollNext}
      {...props}
    >
      <ChevronRight className="size-4" />
    </button>
  );
}

export type { CarouselApi };
