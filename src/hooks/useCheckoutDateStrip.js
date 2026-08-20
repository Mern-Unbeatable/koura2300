import { useCallback, useRef } from 'react';
import { CHECKOUT_DATE_SCROLL_EDGE_OFFSET } from '../components/checkout/checkoutData';

const scrollSiblingIntoView = (element, inline) => {
  element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline });
};

const useCheckoutDateStrip = (onSelect) => {
  const stripRef = useRef(null);

  const handleDateSelect = useCallback(
    (dateId, event) => {
      onSelect(dateId);

      const button = event.currentTarget;
      const strip = stripRef.current;
      if (!strip || !button) {
        return;
      }

      const stripRect = strip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const nextButton = button.nextElementSibling;
      const previousButton = button.previousElementSibling;
      const isAtRightEdge =
        buttonRect.right >= stripRect.right - CHECKOUT_DATE_SCROLL_EDGE_OFFSET;

      if (nextButton && isAtRightEdge) {
        scrollSiblingIntoView(nextButton, 'end');
        return;
      }

      if (previousButton && buttonRect.left < stripRect.left) {
        scrollSiblingIntoView(button, 'start');
      }
    },
    [onSelect],
  );

  return {
    stripRef,
    handleDateSelect,
  };
};

export default useCheckoutDateStrip;
