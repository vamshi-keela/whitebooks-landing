import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Extra margin around the root so we activate slightly before scrolling in. */
  rootMargin?: string;
  /** Treat as visible until the observer first reports — avoids a blank first paint. */
  initial?: boolean;
}

/**
 * Tracks whether the referenced element is within (or near) the viewport.
 *
 * Used to pause expensive, always-running visual work (the hero's animated
 * fluid background, the logo marquee) while the element is scrolled away.
 * Keeping those animations alive off-screen holds GPU memory and causes the
 * browser to evict the section's rasterized tiles — the reason scrolling back
 * to the top stalls for a beat while everything re-paints.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  { rootMargin = '300px 0px', initial = true }: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(initial);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return [ref, inView];
}
