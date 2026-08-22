export const OVERVIEW_CHART_PADDING = {
  top: 16,
  right: 16,
  bottom: 24,
  left: 48,
};

export const buildChartCoordinates = (
  months,
  width,
  height,
  maxValue,
  padding = OVERVIEW_CHART_PADDING,
) => {
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const step = months.length > 1 ? chartWidth / (months.length - 1) : 0;

  return months.map((entry, index) => {
    const normalizedValue = maxValue === 0 ? 0 : entry.value / maxValue;
    const x = padding.left + step * index;
    const y = padding.top + chartHeight - normalizedValue * chartHeight;

    return {
      ...entry,
      x,
      y,
      baselineY: padding.top + chartHeight,
    };
  });
};

const getControlPoint = (previous, current, next, reverse) => {
  const point = reverse ? previous : next;
  const smoothing = 0.2;
  const deltaX = point.x - current.x;
  const deltaY = point.y - current.y;

  return {
    x: current.x + deltaX * smoothing,
    y: current.y + deltaY * smoothing,
  };
};

export const buildSmoothLinePath = (coordinates) => {
  if (coordinates.length === 0) {
    return '';
  }

  if (coordinates.length === 1) {
    return `M ${coordinates[0].x} ${coordinates[0].y}`;
  }

  const [firstPoint, ...remainingPoints] = coordinates;
  let path = `M ${firstPoint.x} ${firstPoint.y}`;

  remainingPoints.forEach((point, index) => {
    const previousPoint = coordinates[index];
    const nextPoint = coordinates[index + 2] ?? point;
    const controlStart = getControlPoint(previousPoint, previousPoint, point, false);
    const controlEnd = getControlPoint(previousPoint, point, nextPoint, true);

    path += ` C ${controlStart.x} ${controlStart.y}, ${controlEnd.x} ${controlEnd.y}, ${point.x} ${point.y}`;
  });

  return path;
};

export const buildAreaPath = (coordinates) => {
  if (coordinates.length === 0) {
    return '';
  }

  const linePath = buildSmoothLinePath(coordinates);
  const firstPoint = coordinates[0];
  const lastPoint = coordinates[coordinates.length - 1];

  return `${linePath} L ${lastPoint.x} ${lastPoint.baselineY} L ${firstPoint.x} ${firstPoint.baselineY} Z`;
};

export const formatRevenueTooltipValue = (entry) =>
  entry.tooltipValue ?? `$${entry.value.toLocaleString()}.00`;

export const formatRevenueTooltipMonth = (entry) => entry.tooltipMonth ?? entry.month;

export const getChartPlotHeight = (height, padding = OVERVIEW_CHART_PADDING) =>
  height - padding.top - padding.bottom;
