import React, { memo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGINATION_ICON_SIZE = 18;

const PaginationPage = memo(({ pageNumber, isActive, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(pageNumber - 1);
  }, [onSelect, pageNumber]);
  const stateClass = isActive
    ? 'border-brand-orange text-brand-orange'
    : 'border-gray-200 text-gray-800 hover:border-brand-orange hover:text-brand-orange';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Page ${pageNumber}`}
      aria-current={isActive ? 'page' : undefined}
      className={`flex size-8 cursor-pointer items-center justify-center rounded border bg-white text-sm font-bold transition-all duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${stateClass}`}
    >
      {pageNumber}
    </button>
  );
});

PaginationPage.displayName = 'PaginationPage';

const ServiceCatalogPagination = memo(
  ({ pageIndex, pageCount, labels, onPrevious, onNext, onSelectPage }) => {
    const pageNumbers = Array.from({ length: pageCount }, (_, pageNumber) => pageNumber + 1);

    return (
      <nav aria-label={labels.label} className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={pageIndex === 0}
          aria-label={labels.previous}
          className="flex size-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white text-gray-800 transition-all duration-200 ease-in-out hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:border-transparent disabled:bg-gray-400 disabled:text-white disabled:opacity-50"
        >
          <ChevronLeft size={PAGINATION_ICON_SIZE} aria-hidden="true" />
        </button>

        {pageNumbers.map((pageNumber) => (
          <PaginationPage
            key={pageNumber}
            pageNumber={pageNumber}
            isActive={pageIndex === pageNumber - 1}
            onSelect={onSelectPage}
          />
        ))}

        <button
          type="button"
          onClick={onNext}
          disabled={pageIndex === pageCount - 1}
          aria-label={labels.next}
          className="flex size-8 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white text-gray-800 transition-all duration-200 ease-in-out hover:border-brand-orange hover:text-brand-orange focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRight size={PAGINATION_ICON_SIZE} aria-hidden="true" />
        </button>
      </nav>
    );
  },
);

ServiceCatalogPagination.displayName = 'ServiceCatalogPagination';

export default ServiceCatalogPagination;
