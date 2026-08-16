import { useCallback, useEffect, useRef, useState } from 'react';

const SCROLL_EPSILON = 1;

/**
 * Drives a horizontally scrollable track with previous/next controls.
 * When `loop` is true, reaching either end wraps to the opposite end.
 */
const useCarousel = ({ loop = false } = {}) => {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncScrollBounds = useCallback(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const canScroll = maxScrollLeft > SCROLL_EPSILON;

    if (loop) {
      setCanScrollPrev(canScroll);
      setCanScrollNext(canScroll);
      return;
    }

    setCanScrollPrev(track.scrollLeft > SCROLL_EPSILON);
    setCanScrollNext(track.scrollLeft < maxScrollLeft - SCROLL_EPSILON);
  }, [loop]);

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

  const scrollByCard = useCallback(
    (direction) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const firstCard = track.firstElementChild;
      const step = firstCard ? firstCard.clientWidth : track.clientWidth;
      const maxScrollLeft = track.scrollWidth - track.clientWidth;

      if (loop && maxScrollLeft > SCROLL_EPSILON) {
        const atStart = track.scrollLeft <= SCROLL_EPSILON;
        const atEnd = track.scrollLeft >= maxScrollLeft - SCROLL_EPSILON;

        if (direction > 0 && atEnd) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
          return;
        }

        if (direction < 0 && atStart) {
          track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
          return;
        }
      }

      track.scrollBy({ left: direction * step, behavior: 'smooth' });
    },
    [loop],
  );

  const scrollToPrev = useCallback(() => scrollByCard(-1), [scrollByCard]);
  const scrollToNext = useCallback(() => scrollByCard(1), [scrollByCard]);

  return { trackRef, canScrollPrev, canScrollNext, scrollToPrev, scrollToNext };
};

export default useCarousel;
