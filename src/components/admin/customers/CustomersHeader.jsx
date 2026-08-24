import { ChevronDown } from 'lucide-react';
import {
  CUSTOMERS_FILTER_SELECT_CLASS,
  CUSTOMERS_HEADER_CLASS,
  CUSTOMERS_SUBTITLE_CLASS,
  CUSTOMERS_TITLE_CLASS,
} from './customersData';

const CustomersHeader = ({
  title,
  summarySubtitle,
  statusOptions,
  selectedStatusId,
  statusFilterLabel,
  onStatusFilterChange,
}) => (
  <header className={CUSTOMERS_HEADER_CLASS}>
    <div className="flex min-w-0 flex-col gap-1">
      <h1 className={CUSTOMERS_TITLE_CLASS}>{title}</h1>
      <p className={CUSTOMERS_SUBTITLE_CLASS}>{summarySubtitle}</p>
    </div>
    <div className="relative w-full sm:w-auto sm:shrink-0">
      <select
        id="customers-status-filter"
        value={selectedStatusId}
        onChange={onStatusFilterChange}
        aria-label={statusFilterLabel}
        className={CUSTOMERS_FILTER_SELECT_CLASS}
      >
        {statusOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#4a5154]"
        aria-hidden="true"
      />
    </div>
  </header>
);

export default CustomersHeader;
