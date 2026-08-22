import { ChevronDown } from 'lucide-react';
import {
  OVERVIEW_CARD_SUBTITLE_CLASS,
  OVERVIEW_CARD_TITLE_CLASS,
  OVERVIEW_PERIOD_SELECT_CLASS,
  OVERVIEW_REVENUE_CARD_CLASS,
  OVERVIEW_REVENUE_HEADER_CLASS,
  OVERVIEW_REVENUE_PERIOD_WRAP_CLASS,
} from './overviewData';
import RevenueChart from './RevenueChart';

const RevenueOverviewCard = ({
  copy,
  chartCopy,
  months,
  periodOptions,
  selectedPeriodId,
  onPeriodChange,
}) => (
  <section
    className={OVERVIEW_REVENUE_CARD_CLASS}
    aria-label={copy.title}
    role="region"
  >
    <div className={OVERVIEW_REVENUE_HEADER_CLASS}>
      <div className="min-w-0 flex flex-col gap-0.5">
        <h2 className={OVERVIEW_CARD_TITLE_CLASS}>{copy.title}</h2>
        <p className={OVERVIEW_CARD_SUBTITLE_CLASS}>{copy.subtitle}</p>
      </div>
      <div className={OVERVIEW_REVENUE_PERIOD_WRAP_CLASS}>
        <select
          id="overview-revenue-period"
          value={selectedPeriodId}
          onChange={onPeriodChange}
          aria-label={copy.periodLabel}
          className={OVERVIEW_PERIOD_SELECT_CLASS}
        >
          {periodOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#4a5154]"
          aria-hidden="true"
        />
      </div>
    </div>
    <RevenueChart months={months} chartCopy={chartCopy} />
  </section>
);

export default RevenueOverviewCard;
