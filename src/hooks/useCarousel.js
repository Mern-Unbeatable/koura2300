import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_EPSILON = 1;

/**
 * Drives a horizontally scrollable track with previous/next controls.
 * Bounds are derived from the DOM so the controls disable themselves
 * when the track cannot scroll any further in that direction.
 */
const useCarousel = () => {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncScrollBounds = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    setCanScrollPrev(track.scrollLeft > SCROLL_EPSILON);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - SCROLL_EPSILON);
  }, []);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
    }

    syncScrollBounds();
    track.addEventListener('scroll', syncScrollBounds, { passive: true });
    window.addEventListener('resize', syncScrollBounds);

    return () => {
      track.removeEventListener('scroll', syncScrollBounds);
      window.removeEventListener('resize', syncScrollBounds);
    };
  }, [syncScrollBounds]);

  const scrollByCard = useCallback((direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const firstCard = track.firstElementChild;
    const step = firstCard ? firstCard.clientWidth : track.clientWidth;

    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  const scrollToPrev = useCallback(() => scrollByCard(-1), [scrollByCard]);
  const scrollToNext = useCallback(() => scrollByCard(1), [scrollByCard]);

  return { trackRef, canScrollPrev, canScrollNext, scrollToPrev, scrollToNext };
};

export default useCarousel;
