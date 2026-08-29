import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const TOP_OFFSET = 0;

/**
 * Resets window and document scroll containers to the top.
 * Used on route changes and in-page catalog view switches.
 */
export const scrollPageToTop = () => {
  window.scrollTo(TOP_OFFSET, TOP_OFFSET);

  if (document.documentElement) {
    document.documentElement.scrollTop = TOP_OFFSET;
  }

  if (document.body) {
    document.body.scrollTop = TOP_OFFSET;
  }
};

/**
 * Resets the viewport to the top whenever the route changes.
 *
 * createBrowserRouter does not restore scroll position on navigation, so a page
 * entered from halfway down another page would otherwise open mid-scroll.
 * A hash in the URL is left alone so in-page anchor links keep working.
 *
 * A follow-up animation frame covers lazy Suspense content that paints after the
 * first layout pass (common when switching category routes).
 */
const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      return undefined;
    }

    scrollPageToTop();

    const frameId = window.requestAnimationFrame(() => {
      scrollPageToTop();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [pathname, hash]);
};

export default useScrollToTop;
