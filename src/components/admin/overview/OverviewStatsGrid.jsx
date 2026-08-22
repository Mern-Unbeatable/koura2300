import { OVERVIEW_STATS_GRID_CLASS } from './overviewData';
import OverviewStatCard from './OverviewStatCard';

const OverviewStatsGrid = ({ stats, isLoading }) => (
  <section
    data-testid="overview-stats-grid"
    className={OVERVIEW_STATS_GRID_CLASS}
    aria-label="Key performance indicators"
  >
    {stats.map((stat) => (
      <OverviewStatCard key={stat.id} stat={stat} isLoading={isLoading} />
    ))}
  </section>
);

export default OverviewStatsGrid;
