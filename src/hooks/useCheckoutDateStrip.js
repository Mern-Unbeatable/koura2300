import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CHECKOUT_DATE_DRAG_THRESHOLD,
  CHECKOUT_DATE_GAP_PX,
  CHECKOUT_DATE_SCROLL_EDGE_OFFSET,
  CHECKOUT_DATE_SCROLL_STEP,
} from '../components/checkout/checkoutData';

const scrollSiblingIntoView = (element, inline) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline });
};

const getDayScrollWidth = (strip) => {
  const firstButton = strip.querySelector('[role="option"]');
  if (!firstButton) {
    return 0;
  }

  return firstButton.offsetWidth + CHECKOUT_DATE_GAP_PX;
};

const getFirstVisibleDateIndex = (strip) => {
  const buttons = strip.querySelectorAll('[role="option"]');
  const stripRect = strip.getBoundingClientRect();

  for (let index = 0; index < buttons.length; index += 1) {
    const rect = buttons[index].getBoundingClientRect();
    if (rect.right > stripRect.left + 1) {
      return index;
    }
  }

  return 0;
};

const useCheckoutDateStrip = ({ dates, monthYearLabel, onSelect }) => {
  const stripRef = useRef(null);
  const dragMovedRef = useRef(false);
  const dragStateRef = useRef({ startX: 0, scrollLeft: 0 });
  const [displayMonthYear, setDisplayMonthYear] = useState(monthYearLabel);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const syncScrollState = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) {
      return;
    }

    const maxScrollLeft = strip.scrollWidth - strip.clientWidth;
    setCanScrollPrevious(strip.scrollLeft > 0);
    setCanScrollNext(strip.scrollLeft < maxScrollLeft - 1);

    const visibleIndex = getFirstVisibleDateIndex(strip);
    const visibleMonthYear = dates[visibleIndex]?.monthYear;
    if (visibleMonthYear) {
      setDisplayMonthYear(visibleMonthYear);
    }
  }, [dates]);

  useEffect(() => {
    setDisplayMonthYear(monthYearLabel);
  }, [monthYearLabel]);

  useEffect(() => {
    syncScrollState();
  }, [dates, syncScrollState]);

  const scrollStripByDays = useCallback(
    (direction) => {
      const strip = stripRef.current;
      if (!strip) {
        return;
      }

      const dayWidth = getDayScrollWidth(strip);
      if (!dayWidth) {
        return;
      }

      strip.scrollBy({
        left: dayWidth * CHECKOUT_DATE_SCROLL_STEP * direction,
        behavior: 'smooth',
      });

      window.setTimeout(syncScrollState, 300);
    },
    [syncScrollState],
  );

  const handleScrollPrevious = useCallback(() => {
    scrollStripByDays(-1);
  }, [scrollStripByDays]);

  const handleScrollNext = useCallback(() => {
    scrollStripByDays(1);
  }, [scrollStripByDays]);

  const handleMouseDown = useCallback((event) => {
    if (event.button !== 0) {
      return;
    }

    const strip = stripRef.current;
    if (!strip) {
      return;
    }

    dragMovedRef.current = false;
    dragStateRef.current = {
      startX: event.clientX,
      scrollLeft: strip.scrollLeft || 0,
    };
    setIsDragging(true);
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      const strip = stripRef.current;
      if (!strip) {
        return;
      }

      const deltaX = event.clientX - dragStateRef.current.startX;
      if (Math.abs(deltaX) > CHECKOUT_DATE_DRAG_THRESHOLD) {
        dragMovedRef.current = true;
      }

      const nextScrollLeft = dragStateRef.current.scrollLeft - deltaX;
      if (Number.isFinite(nextScrollLeft)) {
        strip.scrollLeft = nextScrollLeft;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      syncScrollState();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, syncScrollState]);

  const handleDateSelect = useCallback(
    (dateId, event) => {
      if (dragMovedRef.current) {
        dragMovedRef.current = false;
        return;
      }

      onSelect(dateId);

      const button = event.currentTarget;
      const strip = stripRef.current;
      if (!strip || !button) {
        return;
      }

      const stripRect = strip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const nextButton = button.nextElementSibling;
      const isAtRightEdge = buttonRect.right >= stripRect.right - CHECKOUT_DATE_SCROLL_EDGE_OFFSET;

      if (nextButton && isAtRightEdge) {
        scrollSiblingIntoView(nextButton, 'end');
        window.setTimeout(syncScrollState, 300);
        return;
      }

      if (buttonRect.left < stripRect.left) {
        scrollSiblingIntoView(button, 'start');
        window.setTimeout(syncScrollState, 300);
      }
    },
    [onSelect, syncScrollState],
  );

  return {
    stripRef,
    displayMonthYear,
    canScrollPrevious,
    canScrollNext,
    isDragging,
    handleDateSelect,
    handleScrollPrevious,
    handleScrollNext,
    handleMouseDown,
    handleStripScroll: syncScrollState,
  };
};

export default useCheckoutDateStrip;
