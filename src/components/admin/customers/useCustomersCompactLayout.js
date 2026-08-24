import { useEffect, useState } from 'react';
import { CUSTOMERS_CARDS_MAX_WIDTH_PX } from './customersData';

export const CUSTOMERS_CARDS_MEDIA_QUERY = `(max-width: ${CUSTOMERS_CARDS_MAX_WIDTH_PX}px)`;

const getCompactLayoutMatch = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia(CUSTOMERS_CARDS_MEDIA_QUERY).matches;
};

const useCustomersCompactLayout = () => {
  const [isCompactLayout, setIsCompactLayout] = useState(getCompactLayoutMatch);

  useEffect(() => {
    const mediaQuery = window.matchMedia(CUSTOMERS_CARDS_MEDIA_QUERY);

    const handleViewportChange = () => {
      setIsCompactLayout(mediaQuery.matches);
    };

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return isCompactLayout;
};

export default useCustomersCompactLayout;
