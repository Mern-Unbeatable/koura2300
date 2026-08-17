import { useCallback, useState } from 'react';
import useBodyScrollLock from './useBodyScrollLock';
import useEscapeKey from './useEscapeKey';

/**
 * Owns the open state of the mobile navigation drawer, plus the two
 * behaviours an overlay always needs: scroll lock and escape-to-close.
 */
const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  useBodyScrollLock(isMenuOpen);
  useEscapeKey(isMenuOpen, closeMenu);

  return { isMenuOpen, toggleMenu, closeMenu };
};

export default useMobileMenu;
