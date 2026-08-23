import { ChevronDown } from 'lucide-react';
import {
  BOOKINGS_FILTER_SELECT_CLASS,
  BOOKINGS_HEADER_CLASS,
  BOOKINGS_SUBTITLE_CLASS,
  BOOKINGS_TITLE_CLASS,
} from './bookingsData';

const BookingsHeader = ({
  title,
  summarySubtitle,
  statusOptions,
  selectedStatusId,
  statusFilterLabel,
  onStatusFilterChange,
}) => (
  <header className={BOOKINGS_HEADER_CLASS}>
    <div className="min-w-0 flex flex-col gap-1">
      <h1 className={BOOKINGS_TITLE_CLASS}>{title}</h1>
      <p className={BOOKINGS_SUBTITLE_CLASS}>{summarySubtitle}</p>
    </div>
    <div className="relative w-full sm:w-auto sm:shrink-0">
      <select
        id="bookings-status-filter"
        value={selectedStatusId}
        onChange={onStatusFilterChange}
        aria-label={statusFilterLabel}
        className={BOOKINGS_FILTER_SELECT_CLASS}
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

export default BookingsHeader;
