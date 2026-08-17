import { useEffect } from 'react';

/**
 * Freezes background scrolling while an overlay is open so the page
 * behind it cannot move under the user's finger.
 */
const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const { body } = document;
    const previousOverflow = body.style.overflow;

    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isLocked]);
};

export default useBodyScrollLock;
