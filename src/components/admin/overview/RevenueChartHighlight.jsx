import {
  OVERVIEW_CHART_COLORS,
  OVERVIEW_CHART_HIGHLIGHT_BORDER,
  OVERVIEW_CHART_HIGHLIGHT_RADIUS,
  OVERVIEW_CHART_HIGHLIGHT_SHADOW,
  OVERVIEW_CHART_TOOLTIP,
} from './overviewData';
import {
  formatRevenueTooltipMonth,
  formatRevenueTooltipValue,
} from './overviewChartUtils';

const RevenueChartTooltip = ({ point }) => (
  <g aria-label={`${formatRevenueTooltipMonth(point)} revenue`}>
    <foreignObject
      x={point.x - OVERVIEW_CHART_TOOLTIP.offsetX}
      y={point.y - OVERVIEW_CHART_TOOLTIP.offsetY}
      width={OVERVIEW_CHART_TOOLTIP.width}
      height={OVERVIEW_CHART_TOOLTIP.height}
    >
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        className="flex h-full flex-col items-center justify-center rounded-lg bg-white px-3 py-2 text-center shadow-[0px_4px_16px_rgba(50,50,71,0.12)]"
      >
        <p
          className="text-xs leading-3"
          style={{ color: OVERVIEW_CHART_COLORS.tooltipMonth }}
        >
          {formatRevenueTooltipMonth(point)}
        </p>
        <p
          className="text-[22px] font-bold leading-7"
          style={{ color: OVERVIEW_CHART_COLORS.tooltipValue }}
        >
          {formatRevenueTooltipValue(point)}
        </p>
      </div>
    </foreignObject>
  </g>
);

const RevenueChartHighlight = ({ point, chartCopy }) => (
  <g aria-label={chartCopy.highlightLabel}>
    <line
      x1={point.x}
      y1={point.y + OVERVIEW_CHART_HIGHLIGHT_RADIUS + OVERVIEW_CHART_HIGHLIGHT_BORDER}
      x2={point.x}
      y2={point.baselineY}
      stroke={OVERVIEW_CHART_COLORS.highlightGuide}
      strokeWidth={1.5}
      strokeDasharray="4 4"
    />
    <circle
      cx={point.x}
      cy={point.y}
      r={OVERVIEW_CHART_HIGHLIGHT_RADIUS}
      fill={OVERVIEW_CHART_COLORS.line}
      stroke="#ffffff"
      strokeWidth={OVERVIEW_CHART_HIGHLIGHT_BORDER}
      style={{ filter: `drop-shadow(${OVERVIEW_CHART_HIGHLIGHT_SHADOW})` }}
    />
    <RevenueChartTooltip point={point} />
  </g>
);

export default RevenueChartHighlight;
