/**
 * Shared motion gate for hero visuals.
 *
 * These visuals loop forever, and a hero that keeps running rAF after the user
 * has scrolled past it is pure waste — so every loop is gated on the element
 * actually being on screen. `active` is also false under prefers-reduced-motion
 * and during SSR prerender, in which case components render their finished
 * state rather than an empty stage.
 */
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function useHeroMotion<T extends Element>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, active: inView && !reduced, reduced };
}

/** Matches the breakpoint at which hero visuals switch to their stacked layout. */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}
