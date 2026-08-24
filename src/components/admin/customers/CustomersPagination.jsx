import {
  CUSTOMERS_FOOTER_CLASS,
  CUSTOMERS_PAGINATION_BUTTON_CLASS,
  CUSTOMERS_PAGINATION_CLASS,
  CUSTOMERS_RESULTS_CLASS,
} from './customersData';

const CustomersPagination = ({
  copy,
  rangeLabel,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
}) => (
  <footer className={CUSTOMERS_FOOTER_CLASS}>
    <p className={CUSTOMERS_RESULTS_CLASS}>{rangeLabel}</p>
    <div className={CUSTOMERS_PAGINATION_CLASS}>
      <button
        type="button"
        className={CUSTOMERS_PAGINATION_BUTTON_CLASS}
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        {copy.pagination.previous}
      </button>
      <button
        type="button"
        className={CUSTOMERS_PAGINATION_BUTTON_CLASS}
        onClick={onNext}
        disabled={!canGoNext}
      >
        {copy.pagination.next}
      </button>
    </div>
  </footer>
);

export default CustomersPagination;
