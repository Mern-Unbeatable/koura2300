import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const SLIDE_DISTANCE = 48;
const DURATION = 0.55;
const STAGGER = 0.07;
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

/**
 * Replays a staggered entrance animation on the container's children
 * whenever `trigger` changes. `direction` decides which side they enter from.
 */
const useGsapReveal = ({ selector, trigger, direction = 1 }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, x: direction * SLIDE_DISTANCE, scale: 0.97 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: DURATION,
          ease: 'power3.out',
          stagger: STAGGER,
          clearProps: 'transform',
        },
      );
    }, container);

    return () => context.revert();
  }, [selector, trigger, direction]);

  return containerRef;
};

export default useGsapReveal;
