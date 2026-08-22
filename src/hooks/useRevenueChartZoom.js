import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OVERVIEW_CHART_ZOOM } from '../components/admin/overview/overviewData';
import {
  adjustZoomLevel,
  getDefaultFocusIndex,
  getVisibleMonthSlice,
  getZoomDirection,
} from '../components/admin/overview/overviewChartUtils';

const useRevenueChartZoom = (months) => {
  const containerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(OVERVIEW_CHART_ZOOM.min);

  const focusIndex = useMemo(() => getDefaultFocusIndex(months), [months]);

  const { visibleMonths } = useMemo(
    () => getVisibleMonthSlice(months, zoomLevel, focusIndex, OVERVIEW_CHART_ZOOM),
    [months, zoomLevel, focusIndex],
  );

  const resetZoom = useCallback(() => {
    setZoomLevel(OVERVIEW_CHART_ZOOM.min);
  }, []);

  const handleWheel = useCallback((event) => {
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

  return {
    containerRef,
    visibleMonths,
    zoomLevel,
    resetZoom,
    isZoomed: zoomLevel > OVERVIEW_CHART_ZOOM.min,
  };
};

export default useRevenueChartZoom;
