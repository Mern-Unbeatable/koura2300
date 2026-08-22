import { ChevronDown } from 'lucide-react';
import { OVERVIEW_CARD_CLASS, OVERVIEW_PERIOD_SELECT_CLASS } from './overviewData';
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
    className={`${OVERVIEW_CARD_CLASS} min-w-0`}
    aria-label={copy.title}
    role="region"
  >
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold leading-7 text-[#1a1a2e]">{copy.title}</h2>
        <p className="text-sm leading-5 text-[#6b7280]">{copy.subtitle}</p>
      </div>
      <div className="relative">
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
          size={14}
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#4a5154]"
          aria-hidden="true"
        />
      </div>
    </div>
    <RevenueChart months={months} chartCopy={chartCopy} />
  </section>
);

export default RevenueOverviewCard;
