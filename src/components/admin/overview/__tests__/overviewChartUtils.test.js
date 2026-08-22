import {
  adjustZoomLevel,
  getDefaultFocusIndex,
  getMonthLabelAnchor,
  getVisibleMonthCount,
  getVisibleMonthSlice,
  getZoomDirection,
} from '../overviewChartUtils';
import { OVERVIEW_CHART_ZOOM, OVERVIEW_REVENUE_MONTHS } from '../overviewData';

describe('overviewChartUtils zoom', () => {
  it('returns zoom in direction for negative wheel delta', () => {
    expect(getZoomDirection(-120)).toBe(1);
  });

  it('returns zoom out direction for positive wheel delta', () => {
    expect(getZoomDirection(120)).toBe(-1);
  });

  it('clamps zoom level between configured bounds', () => {
    expect(adjustZoomLevel(1, -1, OVERVIEW_CHART_ZOOM)).toBe(1);
    expect(adjustZoomLevel(3.9, 1, OVERVIEW_CHART_ZOOM)).toBe(OVERVIEW_CHART_ZOOM.max);
  });

  it('reduces visible months when zooming in', () => {
    const zoomedCount = getVisibleMonthCount(
      OVERVIEW_REVENUE_MONTHS.length,
      2,
      OVERVIEW_CHART_ZOOM,
    );

    expect(zoomedCount).toBeLessThan(OVERVIEW_REVENUE_MONTHS.length);
    expect(zoomedCount).toBeGreaterThanOrEqual(OVERVIEW_CHART_ZOOM.minVisibleMonths);
  });

  it('centers visible slice on highlighted month when zoomed', () => {
    const focusIndex = getDefaultFocusIndex(OVERVIEW_REVENUE_MONTHS);
    const { visibleMonths } = getVisibleMonthSlice(
      OVERVIEW_REVENUE_MONTHS,
      3,
      focusIndex,
      OVERVIEW_CHART_ZOOM,
    );

    expect(visibleMonths.some((month) => month.month === 'Jul')).toBe(true);
  });

  it('anchors first and last month labels to prevent clipping', () => {
    expect(getMonthLabelAnchor(0, 12)).toBe('start');
    expect(getMonthLabelAnchor(11, 12)).toBe('end');
    expect(getMonthLabelAnchor(5, 12)).toBe('middle');
  });
});
