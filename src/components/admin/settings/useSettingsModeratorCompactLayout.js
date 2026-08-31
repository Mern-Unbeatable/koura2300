import { useEffect, useState } from 'react';
import { SETTINGS_MODERATORS_CARDS_MAX_WIDTH_PX } from './settingsData';

export const SETTINGS_MODERATORS_CARDS_MEDIA_QUERY = `(max-width: ${SETTINGS_MODERATORS_CARDS_MAX_WIDTH_PX}px)`;

const getCompactLayoutMatch = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia(SETTINGS_MODERATORS_CARDS_MEDIA_QUERY).matches;
};

const useSettingsModeratorCompactLayout = () => {
  const [isCompactLayout, setIsCompactLayout] = useState(getCompactLayoutMatch);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SETTINGS_MODERATORS_CARDS_MEDIA_QUERY);

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

export default useSettingsModeratorCompactLayout;
