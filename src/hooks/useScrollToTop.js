import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TOP_OFFSET = 0;

/**
 * Resets the viewport to the top whenever the route changes.
 *
 * createBrowserRouter does not restore scroll position on navigation, so a page
 * entered from halfway down another page would otherwise open mid-scroll.
 * A hash in the URL is left alone so in-page anchor links keep working.
 */
const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      return;
    }

    window.scrollTo(TOP_OFFSET, TOP_OFFSET);
  }, [pathname, hash]);
};

export default useScrollToTop;
