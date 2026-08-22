import { useEffect } from 'react';

const SCROLL_EDGE_TOLERANCE_PX = 1;

const canScrollInDirection = (element, deltaY) => {
  const { scrollTop, scrollHeight, clientHeight } = element;

  if (deltaY < 0) {
    return scrollTop > 0;
  }

  return scrollTop + clientHeight < scrollHeight - SCROLL_EDGE_TOLERANCE_PX;
};

/**
 * Keeps wheel/touch scrolling inside the chat message list so the page
 * behind does not move when the list hits its top or bottom edge.
 */
const usePreventScrollChaining = (scrollRef) => {
  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement) {
      return undefined;
    }

    const handleWheel = (event) => {
      if (!canScrollInDirection(scrollElement, event.deltaY)) {
        event.preventDefault();
      }

      event.stopPropagation();
    };

    let touchStartY = 0;

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      const deltaY = touchStartY - event.touches[0].clientY;

      if (!canScrollInDirection(scrollElement, deltaY)) {
        event.preventDefault();
      }

      event.stopPropagation();
    };

    scrollElement.addEventListener('wheel', handleWheel, { passive: false });
    scrollElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollElement.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      scrollElement.removeEventListener('wheel', handleWheel);
      scrollElement.removeEventListener('touchstart', handleTouchStart);
      scrollElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollRef]);
};

export default usePreventScrollChaining;
