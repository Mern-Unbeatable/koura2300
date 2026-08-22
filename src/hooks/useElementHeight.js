import { useLayoutEffect, useState } from 'react';

const useElementHeight = (elementRef) => {
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return undefined;
    }

    const updateHeight = () => {
      setHeight(element.offsetHeight);
    };

    updateHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateHeight);

      return () => {
        window.removeEventListener('resize', updateHeight);
      };
    }

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, [elementRef]);

  return height;
};

export default useElementHeight;
