import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OverviewView from '../OverviewView';
import { OVERVIEW_COPY } from '../overviewCopy';
import {
  OVERVIEW_CATEGORIES,
  OVERVIEW_MESSAGES,
  OVERVIEW_PERIOD_OPTIONS,
  OVERVIEW_REVIEWS,
  OVERVIEW_REVENUE_MONTHS,
  OVERVIEW_STATS,
} from '../overviewData';

const createOverviewViewProps = (overrides = {}) => ({
  copy: OVERVIEW_COPY,
  stats: OVERVIEW_STATS,
  revenueMonths: OVERVIEW_REVENUE_MONTHS,
  categories: OVERVIEW_CATEGORIES,
  reviews: OVERVIEW_REVIEWS,
  messages: OVERVIEW_MESSAGES,
  periodOptions: OVERVIEW_PERIOD_OPTIONS,
  selectedPeriodId: OVERVIEW_PERIOD_OPTIONS[0].id,
  onPeriodChange: jest.fn(),
  onViewAllReviews: jest.fn(),
  onViewAllMessages: jest.fn(),
  isLoading: false,
  error: null,
  ...overrides,
});

describe('OverviewView', () => {
  it('renders dashboard header from Figma copy', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    expect(
      screen.getByRole('heading', { level: 1, name: OVERVIEW_COPY.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(OVERVIEW_COPY.subtitle)).toBeInTheDocument();
  });

  it('renders all four KPI stat cards with seeded values', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    OVERVIEW_STATS.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.value)).toBeInTheDocument();
    });
  });

  it('renders revenue overview region with chart and period selector', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    expect(
      screen.getByRole('region', { name: OVERVIEW_COPY.revenueOverview.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(OVERVIEW_COPY.revenueOverview.subtitle)).toBeInTheDocument();
    expect(screen.getByLabelText(OVERVIEW_COPY.revenueOverview.periodLabel)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: OVERVIEW_COPY.chart.chartImageLabel })).toBeInTheDocument();
  });

  it('renders popular categories with progress bars', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    const region = screen.getByRole('region', { name: OVERVIEW_COPY.popularCategories.title });

    OVERVIEW_CATEGORIES.forEach((category) => {
      expect(within(region).getByText(category.name)).toBeInTheDocument();
      expect(within(region).getByText(String(category.value))).toBeInTheDocument();
      expect(within(region).getByRole('progressbar', { name: category.name })).toBeInTheDocument();
    });
  });

  it('renders recent reviews with star ratings and comments', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    const region = screen.getByRole('region', { name: OVERVIEW_COPY.recentReviews.title });

    expect(within(region).getAllByRole('article')).toHaveLength(OVERVIEW_REVIEWS.length);
    expect(within(region).getByText('Sarah Johnson')).toBeInTheDocument();
    expect(within(region).getAllByText('James Wilson')).toHaveLength(2);
    expect(
      within(region).getAllByRole('img', { name: /out of 5 stars/ }),
    ).toHaveLength(OVERVIEW_REVIEWS.length);
  });

  it('renders recent messages with timestamps and online indicators', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    const region = screen.getByRole('region', { name: OVERVIEW_COPY.recentMessages.title });

    OVERVIEW_MESSAGES.forEach((message) => {
      expect(within(region).getByText(message.name)).toBeInTheDocument();
      expect(within(region).getByText(message.message)).toBeInTheDocument();
      expect(within(region).getByText(message.time)).toBeInTheDocument();
    });

    const onlineMessages = OVERVIEW_MESSAGES.filter((message) => message.isOnline);
    onlineMessages.forEach((message) => {
      expect(
        within(region).getByLabelText(`${message.name} is online`),
      ).toBeInTheDocument();
    });
  });

  it('calls view-all handlers when action buttons are clicked', async () => {
    const user = userEvent.setup();
    const onViewAllReviews = jest.fn();
    const onViewAllMessages = jest.fn();

    render(
      <OverviewView
        {...createOverviewViewProps({ onViewAllReviews, onViewAllMessages })}
      />,
    );

    const reviewsRegion = screen.getByRole('region', { name: OVERVIEW_COPY.recentReviews.title });
    const messagesRegion = screen.getByRole('region', { name: OVERVIEW_COPY.recentMessages.title });

    await user.click(
      within(reviewsRegion).getByRole('button', { name: OVERVIEW_COPY.recentReviews.viewAll }),
    );
    await user.click(
      within(messagesRegion).getByRole('button', { name: OVERVIEW_COPY.recentMessages.viewAll }),
    );

    expect(onViewAllReviews).toHaveBeenCalledTimes(1);
    expect(onViewAllMessages).toHaveBeenCalledTimes(1);
  });

  it('calls onPeriodChange when revenue period is updated', async () => {
    const user = userEvent.setup();
    const onPeriodChange = jest.fn();

    render(<OverviewView {...createOverviewViewProps({ onPeriodChange })} />);

    const select = screen.getByLabelText(OVERVIEW_COPY.revenueOverview.periodLabel);
    await user.selectOptions(select, OVERVIEW_PERIOD_OPTIONS[1].id);

    expect(onPeriodChange).toHaveBeenCalled();
  });

  it('shows loading placeholders for stat cards when isLoading is true', () => {
    render(<OverviewView {...createOverviewViewProps({ isLoading: true })} />);

    expect(screen.getAllByTestId('overview-stat-skeleton')).toHaveLength(OVERVIEW_STATS.length);
  });

  it('shows error banner when error is provided', () => {
    const errorMessage = 'Network error';

    render(<OverviewView {...createOverviewViewProps({ error: errorMessage })} />);

    expect(screen.getByRole('alert')).toHaveTextContent(OVERVIEW_COPY.error);
    expect(screen.getByRole('alert')).toHaveTextContent(errorMessage);
  });

  it('uses responsive layout classes for grids', () => {
    const { container } = render(<OverviewView {...createOverviewViewProps()} />);

    expect(container.firstChild).toHaveClass('flex', 'flex-col');
    expect(screen.getByTestId('overview-stats-grid')).toHaveClass('xl:grid-cols-4');
    expect(screen.getByTestId('overview-middle-grid')).toHaveClass('xl:grid-cols-[minmax(0,2.75fr)_minmax(0,0.85fr)]');
    expect(screen.getByTestId('overview-bottom-grid')).toHaveClass('lg:grid-cols-2');
  });

  it('highlights July revenue point on the chart', () => {
    render(<OverviewView {...createOverviewViewProps()} />);

    expect(screen.getByLabelText(OVERVIEW_COPY.chart.highlightLabel)).toBeInTheDocument();
    expect(screen.getByText('July')).toBeInTheDocument();
    expect(screen.getByText('$5600.00')).toBeInTheDocument();
  });
});
