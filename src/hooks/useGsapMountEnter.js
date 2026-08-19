import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const CLEARED_ENTER_PROPS = 'transform,height,overflow,opacity,visibility';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

const useGsapMountEnter = ({ y, duration }) => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element || prefersReducedMotion()) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(element, { overflow: 'hidden' });
      gsap.fromTo(
        element,
        { autoAlpha: 0, y, height: 0 },
        {
          autoAlpha: 1,
          y: 0,
          height: 'auto',
          duration,
          ease: 'power2.out',
          onComplete: () => {
            gsap.set(element, { clearProps: CLEARED_ENTER_PROPS });
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [duration, y]);

  return elementRef;
};

export default useGsapMountEnter;
