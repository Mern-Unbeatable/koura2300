export const OVERVIEW_CHART_PADDING = {
  top: 16,
  right: 16,
  bottom: 32,
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
    };
  });
};

export const buildLinePath = (coordinates) => {
  if (coordinates.length === 0) {
    return '';
  }

  return coordinates
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');
};

export const formatRevenueTooltip = (entry) => entry.tooltipValue ?? `$${entry.value.toLocaleString()}.00`;
