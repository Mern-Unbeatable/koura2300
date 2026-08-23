import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX,
  getActionMenuPosition,
} from './bookingsActionMenuUtils';

const useBookingsActionMenu = ({ isOpen, onClose }) => {
  const anchorRef = useRef(null);
  const menuRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(null);

  const syncMenuPosition = useCallback(() => {
    const anchorElement = anchorRef.current;

    if (!anchorElement) {
      return;
    }

    const menuHeight = menuRef.current?.offsetHeight ?? BOOKINGS_ACTION_MENU_ESTIMATED_HEIGHT_PX;
    setMenuPosition(getActionMenuPosition(anchorElement.getBoundingClientRect(), menuHeight));
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      setMenuPosition(null);
      return undefined;
    }

    syncMenuPosition();

    window.addEventListener('resize', syncMenuPosition);
    window.addEventListener('scroll', syncMenuPosition, true);

    return () => {
      window.removeEventListener('resize', syncMenuPosition);
      window.removeEventListener('scroll', syncMenuPosition, true);
    };
  }, [isOpen, syncMenuPosition]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const anchorElement = anchorRef.current;
      const menuElement = menuRef.current;

      if (
        anchorElement?.contains(event.target) ||
        menuElement?.contains(event.target)
      ) {
        return;
      }

      onClose();
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  return {
    anchorRef,
    menuRef,
    menuPosition,
    syncMenuPosition,
  };
};

export default useBookingsActionMenu;
