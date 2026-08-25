import {
  SERVICES_PAGINATION_CLASS,
  SERVICES_PAGINATION_CONTROL_CLASS,
  SERVICES_PAGINATION_ELLIPSIS_CLASS,
  SERVICES_PAGINATION_PAGE_ACTIVE_CLASS,
  SERVICES_PAGINATION_PAGE_CLASS,
} from './servicesData';
import { PAGINATION_ELLIPSIS_TOKEN } from './servicesUtils';

const ServicesPagination = ({
  copy,
  currentPage,
  pageItems,
  canGoPrevious,
  canGoNext,
  onPrevious,
  onNext,
  onPageChange,
}) => (
  <nav
    className={SERVICES_PAGINATION_CLASS}
    aria-label="Services pagination"
    data-testid="services-pagination"
  >
    <button
      type="button"
      className={SERVICES_PAGINATION_CONTROL_CLASS}
      onClick={onPrevious}
      disabled={!canGoPrevious}
      aria-label={copy.pagination.previous}
    >
      {copy.pagination.previous}
    </button>

    {pageItems.map((item, index) => {
      if (item === PAGINATION_ELLIPSIS_TOKEN) {
        return (
          <span
            key={`ellipsis-${index}`}
            className={SERVICES_PAGINATION_ELLIPSIS_CLASS}
            aria-hidden="true"
          >
            {copy.pagination.ellipsis}
          </span>
        );
      }

      const isActive = item === currentPage;

      return (
        <button
          key={item}
          type="button"
          aria-label={copy.pagination.pageLabel(item)}
          aria-current={isActive ? 'page' : undefined}
          className={
            isActive ? SERVICES_PAGINATION_PAGE_ACTIVE_CLASS : SERVICES_PAGINATION_PAGE_CLASS
          }
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      );
    })}

    <button
      type="button"
      className={SERVICES_PAGINATION_CONTROL_CLASS}
      onClick={onNext}
      disabled={!canGoNext}
      aria-label={copy.pagination.next}
    >
      {copy.pagination.next}
    </button>
  </nav>
);

export default ServicesPagination;
