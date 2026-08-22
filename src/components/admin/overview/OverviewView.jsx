import {
  OVERVIEW_BOTTOM_GRID_CLASS,
  OVERVIEW_MIDDLE_GRID_CLASS,
  OVERVIEW_PAGE_CLASS,
} from './overviewData';
import OverviewHeader from './OverviewHeader';
import OverviewStatsGrid from './OverviewStatsGrid';
import PopularCategoriesCard from './PopularCategoriesCard';
import RecentMessagesCard from './RecentMessagesCard';
import RecentReviewsCard from './RecentReviewsCard';
import RevenueOverviewCard from './RevenueOverviewCard';

const OverviewErrorBanner = ({ message, copy }) => (
  <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
    {copy}
    {message ? `: ${message}` : null}
  </div>
);

const OverviewView = ({
  copy,
  stats,
  revenueMonths,
  categories,
  reviews,
  messages,
  periodOptions,
  selectedPeriodId,
  onPeriodChange,
  onViewAllReviews,
  onViewAllMessages,
  isLoading,
  error,
}) => (
  <div className={OVERVIEW_PAGE_CLASS}>
    <OverviewHeader title={copy.title} subtitle={copy.subtitle} />

    {error ? <OverviewErrorBanner message={error} copy={copy.error} /> : null}

    <OverviewStatsGrid stats={stats} isLoading={isLoading} />

    <div data-testid="overview-middle-grid" className={OVERVIEW_MIDDLE_GRID_CLASS}>
      <RevenueOverviewCard
        copy={copy.revenueOverview}
        chartCopy={copy.chart}
        months={revenueMonths}
        periodOptions={periodOptions}
        selectedPeriodId={selectedPeriodId}
        onPeriodChange={onPeriodChange}
      />
      <PopularCategoriesCard title={copy.popularCategories.title} categories={categories} />
    </div>

    <div data-testid="overview-bottom-grid" className={OVERVIEW_BOTTOM_GRID_CLASS}>
      <RecentReviewsCard
        title={copy.recentReviews.title}
        viewAllLabel={copy.recentReviews.viewAll}
        reviews={reviews}
        onViewAll={onViewAllReviews}
      />
      <RecentMessagesCard
        title={copy.recentMessages.title}
        viewAllLabel={copy.recentMessages.viewAll}
        messages={messages}
        onViewAll={onViewAllMessages}
      />
    </div>
  </div>
);

export default OverviewView;
