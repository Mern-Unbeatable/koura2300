import { useEffect } from 'react';

const useClickOutside = (isActive, ref, onClickOutside) => {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [isActive, onClickOutside, ref]);
};

export default useClickOutside;
