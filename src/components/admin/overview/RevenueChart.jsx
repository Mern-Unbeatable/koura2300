import { useId, useMemo } from 'react';
import useRevenueChartZoom from '../../../hooks/useRevenueChartZoom';
import {
  OVERVIEW_CHART_AXIS_LABEL_CLASS,
  OVERVIEW_CHART_COLORS,
  OVERVIEW_CHART_GRID_OFFSET_Y,
  OVERVIEW_CHART_HEIGHT_PX,
  OVERVIEW_CHART_MAX_VALUE,
  OVERVIEW_CHART_MONTH_LABEL_OFFSET_Y,
  OVERVIEW_CHART_PRESERVE_ASPECT,
  OVERVIEW_CHART_SVG_CLASS,
  OVERVIEW_CHART_WRAP_CLASS,
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
  OVERVIEW_CHART_PADDING,
} from './overviewChartUtils';
import RevenueChartHighlight from './RevenueChartHighlight';

const GRID_LINE_COUNT = OVERVIEW_CHART_Y_LABELS.length;

const RevenueChartGrid = ({ plotHeight }) => (
  <>
    {OVERVIEW_CHART_Y_LABELS.map((label, index) => {
      const invertedIndex = GRID_LINE_COUNT - 1 - index;
      const y = OVERVIEW_CHART_PADDING.top + (plotHeight / (GRID_LINE_COUNT - 1)) * invertedIndex;

      return (
        <g key={label}>
          <line
            x1={OVERVIEW_CHART_PADDING.left}
            y1={y}
            x2={OVERVIEW_CHART_WIDTH - OVERVIEW_CHART_PADDING.right}
            y2={y}
            stroke={OVERVIEW_CHART_COLORS.grid}
            strokeWidth={1}
          />
          <text
            x={OVERVIEW_CHART_PADDING.left - 8}
            y={y + OVERVIEW_CHART_GRID_OFFSET_Y - 12}
            textAnchor="end"
            className={OVERVIEW_CHART_AXIS_LABEL_CLASS}
          >
            {label}
          </text>
        </g>
      );
    })}
  </>
);

const RevenueChartMonthLabels = ({ coordinates }) => (
  <>
    {coordinates.map((point) => (
      <text
        key={point.month}
        x={point.x}
        y={point.baselineY + OVERVIEW_CHART_MONTH_LABEL_OFFSET_Y}
        textAnchor="middle"
        className={OVERVIEW_CHART_AXIS_LABEL_CLASS}
      >
        {point.month}
      </text>
    ))}
  </>
);

const RevenueChart = ({ months, chartCopy }) => {
  const gradientId = useId();
  const { containerRef, visibleMonths, zoomLevel, resetZoom, isZoomed } =
    useRevenueChartZoom(months);

  const coordinates = useMemo(
    () =>
      buildChartCoordinates(
        visibleMonths,
        OVERVIEW_CHART_WIDTH,
        OVERVIEW_CHART_HEIGHT_PX,
        OVERVIEW_CHART_MAX_VALUE,
      ),
    [visibleMonths],
  );

  const linePath = useMemo(() => buildSmoothLinePath(coordinates), [coordinates]);
  const areaPath = useMemo(() => buildAreaPath(coordinates), [coordinates]);
  const highlightedPoint = coordinates.find((point) => point.highlighted);
  const plotHeight = getChartPlotHeight(OVERVIEW_CHART_HEIGHT_PX);

  return (
    <div
      ref={containerRef}
      className={OVERVIEW_CHART_WRAP_CLASS}
      aria-label={chartCopy.zoomHint}
      onDoubleClick={resetZoom}
    >
      <svg
        role="img"
        aria-label={chartCopy.xAxisLabel}
        viewBox={`0 0 ${OVERVIEW_CHART_WIDTH} ${OVERVIEW_CHART_HEIGHT_PX}`}
        className={OVERVIEW_CHART_SVG_CLASS}
        preserveAspectRatio={OVERVIEW_CHART_PRESERVE_ASPECT}
      >
        <title>{chartCopy.xAxisLabel}</title>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={OVERVIEW_CHART_COLORS.areaGradientStart} />
            <stop offset="100%" stopColor={OVERVIEW_CHART_COLORS.areaGradientEnd} />
          </linearGradient>
        </defs>

        <RevenueChartGrid plotHeight={plotHeight} />

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={OVERVIEW_CHART_COLORS.line}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <RevenueChartMonthLabels coordinates={coordinates} />

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
