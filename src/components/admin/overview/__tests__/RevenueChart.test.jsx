import { render, screen } from '@testing-library/react';
import RevenueChart from '../RevenueChart';
import { OVERVIEW_COPY } from '../overviewCopy';
import { OVERVIEW_REVENUE_MONTHS } from '../overviewData';

jest.mock('../../../../hooks/useRevenueChartZoom', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useRevenueChartZoom from '../../../../hooks/useRevenueChartZoom';

describe('RevenueChart zoom', () => {
  beforeEach(() => {
    useRevenueChartZoom.mockReturnValue({
      containerRef: { current: null },
      visibleMonths: OVERVIEW_REVENUE_MONTHS,
      zoomLevel: 1,
      resetZoom: jest.fn(),
      isZoomed: false,
    });
  });

  it('renders scroll zoom hint for admins', () => {
    render(
      <RevenueChart months={OVERVIEW_REVENUE_MONTHS} chartCopy={OVERVIEW_COPY.chart} />,
    );

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.zoomHint)).toBeInTheDocument();
  });

  it('shows zoom percentage badge when chart is zoomed in', () => {
    useRevenueChartZoom.mockReturnValue({
      containerRef: { current: null },
      visibleMonths: OVERVIEW_REVENUE_MONTHS.slice(0, 3),
      zoomLevel: 2,
      resetZoom: jest.fn(),
      isZoomed: true,
    });

    render(
      <RevenueChart months={OVERVIEW_REVENUE_MONTHS} chartCopy={OVERVIEW_COPY.chart} />,
    );

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.zoomLevelLabel)).toHaveTextContent('200%');
  });
});
