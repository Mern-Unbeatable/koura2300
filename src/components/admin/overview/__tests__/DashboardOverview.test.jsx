import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from '../../../../pages/admin/Dashboard';
import { OVERVIEW_COPY } from '../overviewCopy';
import { OVERVIEW_STATS } from '../overviewData';

jest.mock('../../../../hooks/useAdminOverview', () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useAdminOverview from '../../../../hooks/useAdminOverview';

const renderDashboard = () =>
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );

describe('Dashboard overview integration', () => {
  beforeEach(() => {
    useAdminOverview.mockReturnValue({
      copy: OVERVIEW_COPY,
      stats: OVERVIEW_STATS,
      revenueMonths: [],
      categories: [],
      reviews: [],
      messages: [],
      periodOptions: [],
      selectedPeriodId: 'this-year',
      onPeriodChange: jest.fn(),
      onViewAllReviews: jest.fn(),
      onViewAllMessages: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  it('renders OverviewView through the Dashboard page wrapper', () => {
    renderDashboard();

    expect(
      screen.getByRole('heading', { level: 1, name: OVERVIEW_COPY.title }),
    ).toBeInTheDocument();
    expect(useAdminOverview).toHaveBeenCalled();
  });

  it('passes hook state into the overview presentation layer', () => {
    useAdminOverview.mockReturnValue({
      copy: OVERVIEW_COPY,
      stats: OVERVIEW_STATS,
      revenueMonths: [],
      categories: [],
      reviews: [],
      messages: [],
      periodOptions: [],
      selectedPeriodId: 'this-year',
      onPeriodChange: jest.fn(),
      onViewAllReviews: jest.fn(),
      onViewAllMessages: jest.fn(),
      isLoading: true,
      error: 'API unavailable',
    });

    renderDashboard();

    expect(screen.getByRole('alert')).toHaveTextContent('API unavailable');
    expect(screen.getAllByTestId('overview-stat-skeleton')).toHaveLength(OVERVIEW_STATS.length);
  });
});
