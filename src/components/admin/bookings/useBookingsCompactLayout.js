import { useEffect, useState } from 'react';
import { BOOKINGS_VIEWPORT } from './bookingsData';

export const BOOKINGS_CARDS_MEDIA_QUERY = `(max-width: ${BOOKINGS_VIEWPORT.LAPTOP}px)`;

const getCompactLayoutMatch = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia(BOOKINGS_CARDS_MEDIA_QUERY).matches;
};

const useBookingsCompactLayout = () => {
  const [isCompactLayout, setIsCompactLayout] = useState(getCompactLayoutMatch);

  useEffect(() => {
    const mediaQuery = window.matchMedia(BOOKINGS_CARDS_MEDIA_QUERY);

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

export default useBookingsCompactLayout;
