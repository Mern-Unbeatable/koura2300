import {
  OVERVIEW_CHART_COLORS,
  OVERVIEW_CHART_HIGHLIGHT_BORDER,
  OVERVIEW_CHART_HIGHLIGHT_RADIUS,
  OVERVIEW_CHART_HIGHLIGHT_SHADOW,
  OVERVIEW_CHART_TOOLTIP,
  OVERVIEW_CHART_WIDTH,
} from './overviewData';
import {
  clampTooltipX,
  formatRevenueTooltipMonth,
  formatRevenueTooltipValue,
} from './overviewChartUtils';

const RevenueChartTooltip = ({ point }) => {
  const tooltipX = clampTooltipX(
    point.x,
    OVERVIEW_CHART_TOOLTIP.width,
    OVERVIEW_CHART_WIDTH,
    OVERVIEW_CHART_TOOLTIP.offsetX,
  );

  return (
    <g aria-label={`${formatRevenueTooltipMonth(point)} revenue`}>
      <foreignObject
        x={tooltipX}
        y={point.y - OVERVIEW_CHART_TOOLTIP.offsetY}
        width={OVERVIEW_CHART_TOOLTIP.width}
        height={OVERVIEW_CHART_TOOLTIP.height}
      >
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          className="flex h-full flex-col items-start justify-center rounded-lg bg-white px-[13px] py-[7px] text-left shadow-[0px_4px_16px_rgba(50,50,71,0.12)]"
        >
          <p
            className="text-[10px] leading-3 sm:text-xs"
            style={{ color: OVERVIEW_CHART_COLORS.tooltipMonth }}
          >
            {formatRevenueTooltipMonth(point)}
          </p>
          <p
            className="text-base font-bold leading-6 sm:text-[22px] sm:leading-7"
            style={{ color: OVERVIEW_CHART_COLORS.tooltipValue }}
          >
            {formatRevenueTooltipValue(point)}
          </p>
        </div>
      </foreignObject>
    </g>
  );
};

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
