import {
  ClipboardList,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';
import { OVERVIEW_STAT_ICON_WRAP, OVERVIEW_STAT_VALUE_CLASS, OVERVIEW_STAT_LABEL_CLASS } from './overviewData';

const STAT_ICONS = {
  'total-revenue': DollarSign,
  'todays-revenue': TrendingUp,
  'pending-orders': ClipboardList,
  'active-customers': Users,
};

const OverviewStatCard = ({ stat, isLoading }) => {
  const Icon = STAT_ICONS[stat.id];

  return (
    <article className="flex flex-col gap-1 rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className={OVERVIEW_STAT_ICON_WRAP[stat.iconVariant]}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      {isLoading ? (
        <span
          data-testid="overview-stat-skeleton"
          className="mt-1 block h-8 w-24 animate-pulse rounded bg-gray-100"
        />
      ) : (
        <p className={OVERVIEW_STAT_VALUE_CLASS}>
          {stat.value}
        </p>
      )}
      <p className={OVERVIEW_STAT_LABEL_CLASS}>{stat.label}</p>
    </article>
  );
};

export default OverviewStatCard;
