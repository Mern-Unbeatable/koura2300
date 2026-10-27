import { useEffect, useState } from 'react';
import {
  hydratePostedMediaCache,
  subscribePostedMedia,
} from '../services/postedMediaStore';

/**
 * Loads IndexedDB image payloads into memory and re-renders when media changes.
 */
const usePostedMediaHydration = () => {
  const [mediaVersion, setMediaVersion] = useState(0);

  useEffect(() => {
    let isActive = true;

    const bumpMediaVersion = () => {
      if (isActive) {
        setMediaVersion((current) => current + 1);
      }
    };

    const unsubscribe = subscribePostedMedia(bumpMediaVersion);

    hydratePostedMediaCache().then((cachedCount) => {
      if (cachedCount > 0) {
        bumpMediaVersion();
      }
    });

    return () => {
      isActive = false;
      unsubscribe();
    };
  }, []);

  return mediaVersion;
};

export default usePostedMediaHydration;
