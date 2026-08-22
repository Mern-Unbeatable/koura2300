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
      isMobileScroll: false,
    });
  });

  it('renders desktop zoom hint for admins', () => {
    render(
      <RevenueChart months={OVERVIEW_REVENUE_MONTHS} chartCopy={OVERVIEW_COPY.chart} />,
    );

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.zoomHint)).toBeInTheDocument();
  });

  it('uses horizontal scroll layout on mobile widths', () => {
    useRevenueChartZoom.mockReturnValue({
      containerRef: { current: null },
      visibleMonths: OVERVIEW_REVENUE_MONTHS,
      zoomLevel: 1,
      resetZoom: jest.fn(),
      isZoomed: false,
      isMobileScroll: true,
    });

    render(
      <RevenueChart months={OVERVIEW_REVENUE_MONTHS} chartCopy={OVERVIEW_COPY.chart} />,
    );

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.mobileScrollHint)).toBeInTheDocument();
    expect(screen.getByLabelText(OVERVIEW_COPY.chart.mobileScrollHint)).toHaveClass(
      'overflow-x-auto',
      'touch-pan-x',
      'scrollbar-chart',
      'md:overflow-hidden',
    );
  });

  it('shows zoom percentage badge when chart is zoomed in', () => {
    useRevenueChartZoom.mockReturnValue({
      containerRef: { current: null },
      visibleMonths: OVERVIEW_REVENUE_MONTHS.slice(0, 3),
      zoomLevel: 2,
      resetZoom: jest.fn(),
      isZoomed: true,
      isMobileScroll: false,
    });

    render(
      <RevenueChart months={OVERVIEW_REVENUE_MONTHS} chartCopy={OVERVIEW_COPY.chart} />,
    );

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.zoomLevelLabel)).toHaveTextContent('200%');
  });
});
