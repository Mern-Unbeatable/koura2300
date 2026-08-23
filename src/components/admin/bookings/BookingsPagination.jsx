import {
  BOOKINGS_FOOTER_CLASS,
  BOOKINGS_PAGINATION_BUTTON_CLASS,
  BOOKINGS_PAGINATION_CLASS,
  BOOKINGS_RESULTS_CLASS,
} from './bookingsData';

const BookingsPagination = ({ copy, rangeLabel, canGoPrevious, canGoNext, onPrevious, onNext }) => (
  <footer className={BOOKINGS_FOOTER_CLASS}>
    <p className={BOOKINGS_RESULTS_CLASS}>{rangeLabel}</p>
    <div className={BOOKINGS_PAGINATION_CLASS}>
      <button
        type="button"
        className={BOOKINGS_PAGINATION_BUTTON_CLASS}
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        {copy.pagination.previous}
      </button>
      <button
        type="button"
        className={BOOKINGS_PAGINATION_BUTTON_CLASS}
        onClick={onNext}
        disabled={!canGoNext}
      >
        {copy.pagination.next}
      </button>
    </div>
  </footer>
);

export default BookingsPagination;
