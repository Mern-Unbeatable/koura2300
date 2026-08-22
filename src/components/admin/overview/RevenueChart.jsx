import { useId, useMemo } from 'react';
import useRevenueChartZoom from '../../../hooks/useRevenueChartZoom';
import {
  OVERVIEW_CHART_COLORS,
  OVERVIEW_CHART_CONTAINER_CLASS,
  OVERVIEW_CHART_GRID_OFFSET_Y,
  OVERVIEW_CHART_LAYOUT,
  OVERVIEW_CHART_MAX_VALUE,
  OVERVIEW_CHART_PRESERVE_ASPECT,
  OVERVIEW_CHART_WIDTH,
  OVERVIEW_CHART_Y_LABELS,
  OVERVIEW_CHART_ZOOM_BADGE_CLASS,
} from './overviewData';
import {
  buildAreaPath,
  buildChartCoordinates,
  buildSmoothLinePath,
  formatZoomPercentage,
  getChartPlotHeight,
  getMonthLabelAnchor,
} from './overviewChartUtils';
import RevenueChartHighlight from './RevenueChartHighlight';

const GRID_LINE_COUNT = OVERVIEW_CHART_Y_LABELS.length;

const RevenueChartGrid = ({ plotHeight, padding, axisLabelClass }) => (
  <>
    {OVERVIEW_CHART_Y_LABELS.map((label, index) => {
      const invertedIndex = GRID_LINE_COUNT - 1 - index;
      const y = padding.top + (plotHeight / (GRID_LINE_COUNT - 1)) * invertedIndex;

      return (
        <g key={label}>
          <line
            x1={padding.left}
            y1={y}
            x2={OVERVIEW_CHART_WIDTH - padding.right}
            y2={y}
            stroke={OVERVIEW_CHART_COLORS.grid}
            strokeWidth={1}
          />
          <text
            x={padding.left - 8}
            y={y + OVERVIEW_CHART_GRID_OFFSET_Y - 12}
            textAnchor="end"
            className={axisLabelClass}
          >
            {label}
          </text>
        </g>
      );
    })}
  </>
);

const RevenueChartMonthLabels = ({ coordinates, monthLabelOffsetY, axisLabelClass }) => (
  <>
    {coordinates.map((point, index) => (
      <text
        key={point.month}
        x={point.x}
        y={point.baselineY + monthLabelOffsetY}
        textAnchor={getMonthLabelAnchor(index, coordinates.length)}
        className={axisLabelClass}
      >
        {point.month}
      </text>
    ))}
  </>
);

const RevenueChart = ({ months, chartCopy }) => {
  const gradientId = useId();
  const chartLayout = OVERVIEW_CHART_LAYOUT;
  const { containerRef, visibleMonths, zoomLevel, resetZoom, isZoomed } =
    useRevenueChartZoom(months);

  const coordinates = useMemo(
    () =>
      buildChartCoordinates(
        visibleMonths,
        OVERVIEW_CHART_WIDTH,
        chartLayout.heightPx,
        OVERVIEW_CHART_MAX_VALUE,
        chartLayout.padding,
      ),
    [visibleMonths, chartLayout],
  );

  const linePath = useMemo(() => buildSmoothLinePath(coordinates), [coordinates]);
  const areaPath = useMemo(() => buildAreaPath(coordinates), [coordinates]);
  const highlightedPoint = coordinates.find((point) => point.highlighted);
  const plotHeight = getChartPlotHeight(chartLayout.heightPx, chartLayout.padding);

  return (
    <div
      ref={containerRef}
      className={OVERVIEW_CHART_CONTAINER_CLASS}
      aria-label={chartCopy.zoomHint}
      onDoubleClick={resetZoom}
    >
      <svg
        role="img"
        aria-label={chartCopy.chartImageLabel}
        viewBox={`0 0 ${OVERVIEW_CHART_WIDTH} ${chartLayout.heightPx}`}
        className={chartLayout.svgClass}
        preserveAspectRatio={OVERVIEW_CHART_PRESERVE_ASPECT}
      >
        <title>{chartCopy.chartImageLabel}</title>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={OVERVIEW_CHART_COLORS.areaGradientStart} />
            <stop offset="100%" stopColor={OVERVIEW_CHART_COLORS.areaGradientEnd} />
          </linearGradient>
        </defs>

        <RevenueChartGrid
          plotHeight={plotHeight}
          padding={chartLayout.padding}
          axisLabelClass={chartLayout.axisLabelClass}
        />

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={OVERVIEW_CHART_COLORS.line}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <RevenueChartMonthLabels
          coordinates={coordinates}
          monthLabelOffsetY={chartLayout.monthLabelOffsetY}
          axisLabelClass={chartLayout.axisLabelClass}
        />

        {highlightedPoint ? (
          <RevenueChartHighlight point={highlightedPoint} chartCopy={chartCopy} />
        ) : null}
      </svg>

      {isZoomed ? (
        <span className={OVERVIEW_CHART_ZOOM_BADGE_CLASS} aria-label={chartCopy.zoomLevelLabel}>
          {formatZoomPercentage(zoomLevel)}
        </span>
      ) : null}
    </div>
  );
};

export default RevenueChart;
