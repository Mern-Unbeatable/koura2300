import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  OVERVIEW_CHART_LAYOUT,
  OVERVIEW_CHART_MOBILE_MAX_WIDTH_PX,
  OVERVIEW_CHART_WIDTH,
  OVERVIEW_CHART_ZOOM,
} from '../components/admin/overview/overviewData';
import {
  adjustZoomLevel,
  getDefaultFocusIndex,
  getInitialChartScrollLeft,
  getVisibleMonthSlice,
  getZoomDirection,
  isMobileChartScrollViewport,
} from '../components/admin/overview/overviewChartUtils';

const syncMobileScrollMode = () =>
  isMobileChartScrollViewport(window.innerWidth, OVERVIEW_CHART_MOBILE_MAX_WIDTH_PX);

const useRevenueChartZoom = (months) => {
  const containerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(OVERVIEW_CHART_ZOOM.min);
  const [isMobileScroll, setIsMobileScroll] = useState(() => syncMobileScrollMode());

  const focusIndex = useMemo(() => getDefaultFocusIndex(months), [months]);

  const { visibleMonths } = useMemo(
    () => getVisibleMonthSlice(months, zoomLevel, focusIndex, OVERVIEW_CHART_ZOOM),
    [months, zoomLevel, focusIndex],
  );

  const scrollToHighlightedMonth = useCallback(() => {
    const containerElement = containerRef.current;

    if (!containerElement || !isMobileScroll || zoomLevel > OVERVIEW_CHART_ZOOM.min) {
      return;
    }

    containerElement.scrollLeft = getInitialChartScrollLeft(
      months,
      OVERVIEW_CHART_WIDTH,
      OVERVIEW_CHART_LAYOUT.padding,
    );
  }, [isMobileScroll, months, zoomLevel]);

  const resetZoom = useCallback(() => {
    setZoomLevel(OVERVIEW_CHART_ZOOM.min);
    scrollToHighlightedMonth();
  }, [scrollToHighlightedMonth]);

  const handleWheel = useCallback((event) => {
    if (isMobileChartScrollViewport(window.innerWidth, OVERVIEW_CHART_MOBILE_MAX_WIDTH_PX)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const direction = getZoomDirection(event.deltaY);

    setZoomLevel((currentLevel) => adjustZoomLevel(currentLevel, direction, OVERVIEW_CHART_ZOOM));
  }, []);

  useEffect(() => {
    const containerElement = containerRef.current;

    if (!containerElement) {
      return undefined;
    }

    containerElement.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      containerElement.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${OVERVIEW_CHART_MOBILE_MAX_WIDTH_PX}px)`,
    );

    const handleViewportChange = () => {
      setIsMobileScroll(mediaQuery.matches);
    };

    handleViewportChange();
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

  useEffect(() => {
    scrollToHighlightedMonth();
  }, [scrollToHighlightedMonth]);

  return {
    containerRef,
    visibleMonths,
    zoomLevel,
    resetZoom,
    isZoomed: zoomLevel > OVERVIEW_CHART_ZOOM.min,
    isMobileScroll,
  };
};

export default useRevenueChartZoom;
