export const OVERVIEW_CHART_PADDING = {
  top: 20,
  right: 14,
  bottom: 32,
  left: 44,
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

export const clampTooltipX = (pointX, tooltipWidth, chartWidth, offsetX) => {
  const edgePadding = 4;
  const minX = edgePadding;
  const maxX = chartWidth - tooltipWidth - edgePadding;
  const idealX = pointX - offsetX;

  return Math.max(minX, Math.min(maxX, idealX));
};

export const getZoomDirection = (deltaY) => (deltaY < 0 ? 1 : -1);

export const adjustZoomLevel = (currentLevel, direction, zoomConfig) => {
  const nextLevel = currentLevel + direction * zoomConfig.step;

  return Math.min(zoomConfig.max, Math.max(zoomConfig.min, nextLevel));
};

export const getVisibleMonthCount = (totalMonths, zoomLevel, zoomConfig) =>
  Math.max(zoomConfig.minVisibleMonths, Math.ceil(totalMonths / zoomLevel));

export const getDefaultFocusIndex = (months) => {
  const highlightedIndex = months.findIndex((month) => month.highlighted);

  if (highlightedIndex >= 0) {
    return highlightedIndex;
  }

  return Math.floor(months.length / 2);
};

export const getInitialChartScrollLeft = (months, chartWidth, padding) => {
  const focusIndex = getDefaultFocusIndex(months);

  if (focusIndex <= 0 || months.length <= 1) {
    return 0;
  }

  const chartInnerWidth = chartWidth - padding.left - padding.right;
  const step = chartInnerWidth / (months.length - 1);
  const focusX = padding.left + step * focusIndex;

  return Math.max(0, focusX - padding.left);
};

export const isMobileChartScrollViewport = (viewportWidth, maxWidth = 767) =>
  viewportWidth <= maxWidth;

export const getVisibleMonthSlice = (months, zoomLevel, focusIndex, zoomConfig) => {
  if (zoomLevel <= zoomConfig.min || months.length === 0) {
    return {
      visibleMonths: months,
      windowStart: 0,
    };
  }

  const visibleCount = getVisibleMonthCount(months.length, zoomLevel, zoomConfig);
  const maxStart = Math.max(0, months.length - visibleCount);
  const centeredStart = focusIndex - Math.floor(visibleCount / 2);
  const windowStart = Math.max(0, Math.min(maxStart, centeredStart));

  return {
    visibleMonths: months.slice(windowStart, windowStart + visibleCount),
    windowStart,
  };
};

export const formatZoomPercentage = (zoomLevel) => `${Math.round(zoomLevel * 100)}%`;

export const getMonthLabelAnchor = (index, total) => {
  if (index === 0) {
    return 'start';
  }

  if (index === total - 1) {
    return 'end';
  }

  return 'middle';
};
