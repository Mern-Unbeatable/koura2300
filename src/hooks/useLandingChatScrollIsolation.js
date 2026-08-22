import { useEffect } from 'react';

const SCROLL_EDGE_TOLERANCE_PX = 1;

const canScrollInDirection = (element, deltaY) => {
  const { scrollTop, scrollHeight, clientHeight } = element;

  if (deltaY < 0) {
    return scrollTop > 0;
  }

  return scrollTop + clientHeight < scrollHeight - SCROLL_EDGE_TOLERANCE_PX;
};

const isInsideMessages = (messagesElement, target) =>
  Boolean(messagesElement && target instanceof Node && messagesElement.contains(target));

/**
 * Traps wheel/touch scrolling inside the chat panel so the page only scrolls
 * when the pointer is outside the widget.
 */
const useLandingChatScrollIsolation = (panelRef, messagesRef) => {
  useEffect(() => {
    const panelElement = panelRef.current;

    if (!panelElement) {
      return undefined;
    }

    const handleWheel = (event) => {
      event.stopPropagation();

      const messagesElement = messagesRef.current;

      if (!isInsideMessages(messagesElement, event.target)) {
        event.preventDefault();
        return;
      }

      if (!canScrollInDirection(messagesElement, event.deltaY)) {
        event.preventDefault();
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.stopPropagation();

      const messagesElement = messagesRef.current;

      if (!isInsideMessages(messagesElement, event.target)) {
        event.preventDefault();
        return;
      }

      const deltaY = touchStartY - event.touches[0].clientY;

      if (!canScrollInDirection(messagesElement, deltaY)) {
        event.preventDefault();
      }
    };

    panelElement.addEventListener('wheel', handleWheel, { passive: false });
    panelElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    panelElement.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      panelElement.removeEventListener('wheel', handleWheel);
      panelElement.removeEventListener('touchstart', handleTouchStart);
      panelElement.removeEventListener('touchmove', handleTouchMove);
    };
  }, [panelRef, messagesRef]);
};

export default useLandingChatScrollIsolation;
