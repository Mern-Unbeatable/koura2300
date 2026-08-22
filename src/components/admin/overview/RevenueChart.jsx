import { useMemo } from 'react';
import {
  OVERVIEW_CHART_DEFAULT_RADIUS,
  OVERVIEW_CHART_GRID_OFFSET_Y,
  OVERVIEW_CHART_HEIGHT_PX,
  OVERVIEW_CHART_HIGHLIGHT_RADIUS,
  OVERVIEW_CHART_MAX_VALUE,
  OVERVIEW_CHART_MIN_WIDTH_CLASS,
  OVERVIEW_CHART_TOOLTIP,
  OVERVIEW_CHART_MONTH_LABEL_OFFSET_Y,
  OVERVIEW_CHART_WIDTH,
  OVERVIEW_CHART_Y_LABELS,
} from './overviewData';
import {
  buildChartCoordinates,
  buildLinePath,
  formatRevenueTooltip,
  OVERVIEW_CHART_PADDING,
} from './overviewChartUtils';

const GRID_LINE_COUNT = OVERVIEW_CHART_Y_LABELS.length;

const RevenueChart = ({ months, chartCopy }) => {
  const coordinates = useMemo(
    () =>
      buildChartCoordinates(
        months,
        OVERVIEW_CHART_WIDTH,
        OVERVIEW_CHART_HEIGHT_PX,
        OVERVIEW_CHART_MAX_VALUE,
      ),
    [months],
  );

  const linePath = useMemo(() => buildLinePath(coordinates), [coordinates]);
  const highlightedPoint = coordinates.find((point) => point.highlighted);

  return (
    <div className="w-full overflow-x-auto">
      <svg
        role="img"
        aria-label={chartCopy.xAxisLabel}
        viewBox={`0 0 ${OVERVIEW_CHART_WIDTH} ${OVERVIEW_CHART_HEIGHT_PX}`}
        className={`h-[300px] w-full ${OVERVIEW_CHART_MIN_WIDTH_CLASS}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title>{chartCopy.xAxisLabel}</title>
        {OVERVIEW_CHART_Y_LABELS.map((label, index) => {
          const y =
            (OVERVIEW_CHART_HEIGHT_PX / (GRID_LINE_COUNT - 1)) * index;

          return (
            <g key={label}>
              <line
                x1={OVERVIEW_CHART_PADDING.left}
                y1={y + OVERVIEW_CHART_GRID_OFFSET_Y}
                x2={OVERVIEW_CHART_WIDTH - OVERVIEW_CHART_PADDING.right}
                y2={y + OVERVIEW_CHART_GRID_OFFSET_Y}
                stroke="#f3f4f6"
                strokeWidth={1}
              />
              <text
                x={OVERVIEW_CHART_PADDING.left - 8}
                y={y + OVERVIEW_CHART_GRID_OFFSET_Y + 4}
                textAnchor="end"
                className="fill-[#9ca3af] text-[11px]"
              >
                {label}
              </text>
            </g>
          );
        })}

        <path
          d={linePath}
          fill="none"
          stroke="#fc6f32"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {coordinates.map((point) => (
          <g key={point.month}>
            <circle
              cx={point.x}
              cy={point.y}
              r={point.highlighted ? OVERVIEW_CHART_HIGHLIGHT_RADIUS : OVERVIEW_CHART_DEFAULT_RADIUS}
              fill={point.highlighted ? '#fc6f32' : '#ffffff'}
              stroke="#fc6f32"
              strokeWidth={2}
            />
            <text
              x={point.x}
              y={OVERVIEW_CHART_HEIGHT_PX - OVERVIEW_CHART_MONTH_LABEL_OFFSET_Y}
              textAnchor="middle"
              className="fill-[#6b7280] text-[11px]"
            >
              {point.month}
            </text>
          </g>
        ))}

        {highlightedPoint ? (
          <g aria-label={chartCopy.highlightLabel}>
            <rect
              x={highlightedPoint.x - OVERVIEW_CHART_TOOLTIP.offsetX}
              y={highlightedPoint.y - OVERVIEW_CHART_TOOLTIP.offsetY}
              width={OVERVIEW_CHART_TOOLTIP.width}
              height={OVERVIEW_CHART_TOOLTIP.height}
              rx={OVERVIEW_CHART_TOOLTIP.borderRadius}
              fill="#1a1a2e"
            />
            <text
              x={highlightedPoint.x}
              y={highlightedPoint.y - OVERVIEW_CHART_TOOLTIP.textOffsetY}
              textAnchor="middle"
              className="fill-white text-[11px] font-medium"
            >
              {formatRevenueTooltip(highlightedPoint)}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

export default RevenueChart;
